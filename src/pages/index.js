import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import InformationSection from '@site/src/components/HomepageFeatures/InformationSection';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './HomepageHeader.module.css'; // Importa estilos específicos del componente
import globalStyles from './index.module.css'; 

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const handleScrollToInfo = () => {
    // Desplazamiento suave a la sección con id "info-section"
    const infoSection = document.getElementById('info-section');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className={clsx('hero', styles.heroBanner, globalStyles.globalBanner)}>
      <div className={clsx(styles.container, globalStyles.globalContainer)}>
        <div className={styles.textContainer}>
          <h4 className={styles.subheading}>Documentación y código</h4>
          <h1 className={styles.mainHeading}>
            Compartimos los que hacemos
          </h1>
          <h1 className={styles.mainHeading}>
            Compatimos <span className={styles.highlight}>ProyectosCE</span>
          </h1>
          <button className={styles.ctaButton} onClick={handleScrollToInfo}>Ver más</button>
        </div>
        <div className={styles.imageContainer}>
          <img src='/img/headerimg.webp' alt='Person at computer' className={styles.heroImage} />
          <p className={styles.imageCredit}>
            Designed by <a href="https://www.freepik.es/vector-gratis/ilustracion-concepto-mecanografia-codigo_10594781.htm#fromView=image_search_similar&page=1&position=0&uuid=b16ef2cc-a12b-470a-ade0-db0c20906a90" target="_blank" rel="noopener noreferrer">Freepik</a>
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={"Home"}
      description="Proyectos de la carrera de Ingeniería en computadores TEC">
      <HomepageHeader />
      <main>
        <InformationSection />
      </main>
    </Layout>
  );
}
