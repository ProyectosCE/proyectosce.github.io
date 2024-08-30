import React from 'react';
import styles from './InformationSection.module.css'; // Asegúrate de crear este archivo CSS
import Link from '@docusaurus/Link'; // Importa el componente Link de Docusaurus

function InformationSection() {
    return (
      <section id="info-section" className={styles.infoSection}>
        <div className={styles.container}>
        <h2 className={styles.heading}>¿Quiénes somos?</h2>
        <p className={styles.description}>
          Somos estudiantes de <a href="http://www.tec.ac.cr/ingenieria-computadores" target="_blank" rel="noopener noreferrer" className={styles.link}>Ingeniería en Computadores</a> del <a href="https://tec.ac.cr" target="_blank" rel="noopener noreferrer" className={styles.link}>TEC</a>.
          <br /><br />
          En los cursos se realizan muchos proyectos que mezclan el uso de software y hardware. Aquí compartimos algunos proyectos que hemos hecho.
          <br /><br />
          Para más información sobre nosotros puedes <Link to="/about" className={styles.link}>conocer más aquí</Link>.
            </p>
            <Link to="/proyectos" className={styles.ctaButton}>
          Ver proyectos
        </Link>
        </div>
      </section>
    );
  }
  
  export default InformationSection;