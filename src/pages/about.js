import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import React, { useEffect, useState } from 'react';
import styles from './AboutSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Importar el archivo JSON
import usuarios from '@site/src/data/usuarios.json';

function ProfileCard({ image, name, github, email }) {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    // Función para obtener la imagen de perfil de GitHub
    async function fetchGithubProfileImage() {
      if (github) {
        try {
          const response = await fetch(`https://api.github.com/users/${github}`);
          const data = await response.json();
          setAvatarUrl(data.avatar_url); // Actualiza la URL del avatar en el estado
        } catch (error) {
          console.error('Error al obtener la imagen de perfil de GitHub:', error);
        }
      }
    }

    fetchGithubProfileImage();
  }, [github]); // Se ejecuta cuando el nombre de usuario cambia

  return (
    <div className={styles.profileCard}>
      <img src={avatarUrl} alt={github} className={styles.profileImage} />
      <h2 className={styles.profileName}>{name}</h2>
      <div className={styles.profileLinks}>
        {github && (
          <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className={styles.profileLink}>
            <FontAwesomeIcon icon={faGithub} /> {github}
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className={styles.profileLink}>
            <FontAwesomeIcon icon={faEnvelope} /> {email}
          </a>
        )}
      </div>
    </div>
  );
}


function ProfilesSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>Nosotros</h1>
        <div className={styles.profileGrid}>
          {usuarios.nosotros.map((user, index) => (
            <ProfileCard 
              key={index}
              image={user.image} 
              name={user.name} 
              github={user.github} 
              email={user.email} 
            />
          ))}
        </div>
      </div>
      
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>Colaboradores</h1>
        <div className={styles.profileGrid}>
          {usuarios.colaboradores.map((user, index) => (
            <ProfileCard 
              key={index}
              image={user.image} 
              name={user.name} 
              github={user.github} 
              email={user.email} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={"About"}
      description="Description will go into a meta tag in <head />">
      <main>
        <ProfilesSection />
      </main>
    </Layout>
  );
}
