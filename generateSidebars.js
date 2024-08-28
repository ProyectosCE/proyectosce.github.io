const fs = require('fs');
const path = require('path');

const docsRoot = path.join(__dirname, 'proyectos');
const sidebarDir = path.join(__dirname, 'customsb');
const configPath = path.join(__dirname, 'docusaurus.config.js');

// Crear la carpeta de sidebars si no existe
if (!fs.existsSync(sidebarDir)) {
  fs.mkdirSync(sidebarDir);
}

// Generar y guardar los sidebars con autogenerate y links adicionales
const generateSidebars = (dir, sidebarName) => {
  const sidebar = {
    [sidebarName]: [
      { type: 'autogenerated', dirName: '.' } // Autogenera el contenido del directorio
    ],
  };

  const linksPath = path.join(dir, 'links.json');
  if (fs.existsSync(linksPath)) {
    const links = JSON.parse(fs.readFileSync(linksPath));
    if (links.github) {
      sidebar[sidebarName].push({ type: 'link', label: 'GitHub', href: links.github });
    }
    if (links.azure) {
      sidebar[sidebarName].push({ type: 'link', label: 'Azure DevOps', href: links.azure });
    }
  }

  const sidebarFilePath = path.join(sidebarDir, `${sidebarName}.js`);
  fs.writeFileSync(
    sidebarFilePath,
    `module.exports = ${JSON.stringify(sidebar, null, 2)};`
  );

  return sidebarFilePath;
};

// Actualizar el archivo de configuración de Docusaurus
const updateDocusaurusConfig = (sidebars) => {
  let configContent = fs.readFileSync(configPath, 'utf-8');

  // Define los límites de donde se sobrescribirá el contenido
  const customStart = '// aquí empiezan los sidebars custom';
  const customEnd = '// aquí terminan los sidebars custom';

  const startIdx = configContent.indexOf(customStart) + customStart.length;
  const endIdx = configContent.indexOf(customEnd);

  if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
    throw new Error('No se encontraron las marcas de inicio o fin en el archivo de configuración');
  }

  // Genera el contenido de los nuevos plugins
  const sidebarConfig = sidebars
    .map(
      ([id, carpeta, sidebarPath]) => `
  [
    '@docusaurus/plugin-content-docs',
    {
      id: '${id}',
      path: 'proyectos/${carpeta}/${id}',
      routeBasePath: '${id}',
      sidebarPath: '${sidebarPath.replace(/\\/g, '/').replace(__dirname, '.')}',
      include: ['**/*.md', '**/*.mdx', '**/intro.md'],
    },
  ],`
    )
    .join('').trim();

  // Reemplaza el contenido entre las marcas
  const newConfigContent = `${configContent.slice(0, startIdx)}\n${sidebarConfig}\n${configContent.slice(endIdx)}`;

  fs.writeFileSync(configPath, newConfigContent, 'utf-8');
};

const main = () => {
  const sidebars = [];

  // Declaración de existingSidebars
  const existingSidebars = fs.readdirSync(sidebarDir).map(file => path.basename(file, '.js'));

  const folders = fs.readdirSync(docsRoot);
  folders.forEach((carpeta) => {
    const carpetaPath = path.join(docsRoot, carpeta);
    const proyectos = fs.readdirSync(carpetaPath).filter(folder => fs.lstatSync(path.join(carpetaPath, folder)).isDirectory());

    proyectos.forEach((proyecto) => {
      const sidebarPath = generateSidebars(path.join(carpetaPath, proyecto), proyecto);
      sidebars.push([proyecto, carpeta, sidebarPath]);
    });
  });

  // Eliminar sidebars de carpetas que ya no existen
  existingSidebars.forEach((sidebar) => {
    if (!sidebars.some(([id]) => id === sidebar)) {
      fs.unlinkSync(path.join(sidebarDir, `${sidebar}.js`));
    }
  });

  updateDocusaurusConfig(sidebars);
};

main();
