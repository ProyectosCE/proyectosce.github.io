const fs = require('fs');
const path = require('path');

const docsRoot = path.join(__dirname, 'proyectos');
const staticRoot = path.join(__dirname, 'static', 'proyectos'); // Directorio de destino en 'static'
const dataDir = path.join(__dirname, 'src', 'data'); // Directorio donde se guardará el archivo JSON
const outputFilePath = path.join(dataDir, 'courseSections.json'); // Ruta del archivo JSON que generaremos

// Crear el directorio 'data' si no existe
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const generateCourseSections = () => {
  const courseSections = [];

  // Leer las carpetas en la raíz de 'proyectos'
  const folders = fs.readdirSync(docsRoot);
  console.log(`Carpetas encontradas en ${docsRoot}:`, folders);

  folders.forEach((carpeta) => {
    const carpetaPath = path.join(docsRoot, carpeta);
    const projects = [];

    // Verifica si 'carpetaPath' es un directorio
    try {
      if (fs.lstatSync(carpetaPath).isDirectory()) {
        console.log(`Procesando carpeta: ${carpeta}`);
        const proyectos = fs.readdirSync(carpetaPath).filter(folder =>
          fs.lstatSync(path.join(carpetaPath, folder)).isDirectory()
        );

        console.log(`Proyectos encontrados en ${carpeta}:`, proyectos);

        proyectos.forEach((proyecto) => {
          const imgPathProyectos = path.join(carpetaPath, proyecto, 'img', 'header.png'); // Ruta esperada de la imagen en 'proyectos'
          const imgPathStatic = path.join(staticRoot, carpeta, proyecto, 'header.png'); // Ruta de destino en 'static'

          const tagsPath = path.join(carpetaPath, proyecto, 'tags.json'); // Ruta del archivo tags.json
          let tags = [];

          // Intentar leer las etiquetas desde tags.json
          if (fs.existsSync(tagsPath)) {
            try {
              const tagsData = fs.readFileSync(tagsPath, 'utf8');
              tags = JSON.parse(tagsData);
              console.log(`Etiquetas encontradas para ${proyecto}:`, tags);
            } catch (error) {
              console.error(`Error leyendo ${tagsPath}:`, error.message);
              tags = []; // Si hay un error al leer, dejar tags vacío
            }
          } else {
            console.log(`Archivo tags.json no encontrado para ${proyecto}. Usando tags vacíos.`);
          }

          console.log(`Buscando imagen en ${imgPathStatic}`);
          if (fs.existsSync(imgPathStatic)) {
            // La imagen ya está en static, usamos esa ruta
            projects.push({
              title: proyecto,
              image: `/proyectos/${carpeta}/${proyecto}/header.png`, // Ruta accesible desde static
              link: `/${proyecto}`,
              tags: tags,
            });
            console.log(`Imagen encontrada en static: ${imgPathStatic}`);
          } else if (fs.existsSync(imgPathProyectos)) {
            // La imagen no está en static, pero está en 'proyectos'
            console.log(`Imagen encontrada en proyectos: ${imgPathProyectos}`);
            
            // Crear el directorio en 'static' si no existe
            const destinationDir = path.dirname(imgPathStatic);
            if (!fs.existsSync(destinationDir)) {
              fs.mkdirSync(destinationDir, { recursive: true });
              console.log(`Directorio creado en static: ${destinationDir}`);
            }

            // Mover la imagen a static
            fs.copyFileSync(imgPathProyectos, imgPathStatic);
            console.log(`Imagen movida de ${imgPathProyectos} a ${imgPathStatic}`);

            projects.push({
              title: proyecto,
              image: `/proyectos/${carpeta}/${proyecto}/header.png`, // Ruta accesible desde static
              link: `/${proyecto}`,
              tags: tags,
            });
          } else {
            console.log(`Imagen no encontrada en ninguna ubicación: ${imgPathProyectos}`);
            projects.push({
              title: proyecto,
              image: null, // Sin imagen
              link: `/${proyecto}`,
              tags: tags,
            });
          }
        });

        if (projects.length > 0) {
          courseSections.push({
            courseTitle: carpeta,
            projects,
          });
        }
      } else {
        console.log(`La ruta no es un directorio: ${carpetaPath}`);
      }
    } catch (error) {
      console.error(`Error procesando ${carpetaPath}:`, error.message);
    }
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(courseSections, null, 2));
  console.log(`Course sections data has been generated at ${outputFilePath}`);
};

generateCourseSections();
