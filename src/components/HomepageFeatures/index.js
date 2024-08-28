import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import courseSections from '@site/src/data/courseSections.json'; // Importa el JSON generado

function Project({ image, title, link }) {
  return (
    <div className={clsx('col col--4')}>
      <a href={link} className={clsx('card', styles.projectCard)}>
        <img src={image} alt={title} className={styles.projectImage} />
        <div className={clsx('text--center padding-horiz--md', styles.projectTitle)}>
          <Heading as="h3">{title}</Heading>
        </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
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
    </section>
  );
}
