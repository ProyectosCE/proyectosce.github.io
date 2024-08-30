import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './ProjectSection.module.css';
import courseSections from '@site/src/data/courseSections.json'; // Asegúrate de que este JSON esté en el lugar correcto

function Project({ image, title, link, tags }) {
    // Limitar la cantidad de chips visibles
    const visibleTags = tags.slice(0, 3); // Muestra los primeros 3 chips
    const remainingTagsCount = tags.length - visibleTags.length; // Calcula los chips restantes
  
    return (
      <div className={clsx('col col--4')}>
        <a href={link} className={clsx('card', styles.projectCard)}>
          <img src={image} alt={title} className={styles.projectImage} />
          <div className={clsx('text--center padding-horiz--md', styles.projectTitle)}>
            <Heading as="h3">{title}</Heading>
          </div>
          {/* Contenedor de chips para mostrar características */}
          <div className={styles.chipsContainer}>
            {visibleTags.map((tag, index) => (
              <span key={index} className={styles.chip}>
                {tag}
              </span>
            ))}
            {remainingTagsCount > 0 && (
              <span className={styles.chipMore}>+{remainingTagsCount}</span> // Chip adicional con el signo "+"
            )}
          </div>
        </a>
      </div>
    );
  }

  export default function Projects() {
    return (
      <Layout
        title="Proyectos"
        description="Listado de proyectos realizados por estudiantes de Ingeniería en Computadores del TEC">
        <main className={styles.customBackground}> {/* Aplica la clase aquí */}
          <div className="container">
            <h2 className={styles.sectionTitle}>Proyectos</h2>
            {courseSections.map((section, idx) => (
              <div key={idx} className={styles.courseSection}>
                <Heading as="h2" className={styles.courseTitle}>{section.courseTitle}</Heading>
                <div className="row">
                  {section.projects.map((project, projIdx) => (
                    <Project key={projIdx} {...project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </Layout>
    );
  }
