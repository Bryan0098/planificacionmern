import React from "react";

const Home = () => {
  return (
    <div className="main-wrap">
      {/* Sección principal de la página */}
      <div className="page-section">
        <div className="container">
          {/* Sección de Introducción */}
          <section className="intro">
            <br /><br /><br /><br /><br /><br />  <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br />
            <h2 className="section-title">Bienvenido al Sistema de Accesibilidad</h2>
            <p className="section-description">
              Nuestro sistema está diseñado para proporcionar acceso fácil y funcional a la información para todos los usuarios, sin importar sus habilidades o limitaciones.
            </p>
          </section>

          {/* Sección "Sobre Nosotros" */}
          <section className="about-us mt-5">
            <h3 className="section-subtitle">Sobre Nosotros</h3>
            <p>
              Somos una empresa comprometida con la inclusión digital. Nuestro objetivo es garantizar que todos los usuarios tengan acceso igualitario a la información en la web, independientemente de sus capacidades físicas o mentales.
            </p>
            <p>
              Implementamos herramientas y prácticas de diseño accesible que mejoran la experiencia de usuarios con discapacidades visuales, auditivas y motoras.
            </p>
          </section>

          {/* Sección de Servicios */}
          <section className="services mt-5">
            <h3 className="section-subtitle">Nuestros Servicios</h3>
            <ul>
              <li>Optimización de contenido para personas con discapacidades visuales y auditivas.</li>
              <li>Implementación de tecnologías de asistencia en sitios web.</li>
              <li>Consultoría en accesibilidad web y cumplimiento de normativas.</li>
            </ul>
          </section>

          {/* Sección de Beneficios */}
          <section className="benefits mt-5">
            <h3 className="section-subtitle">Beneficios del Sistema de Accesibilidad</h3>
            <ul>
              <li>Accesibilidad universal para todos los usuarios.</li>
              <li>Mejora de la experiencia de usuario, independientemente de sus limitaciones.</li>
              <li>Mejor posicionamiento en motores de búsqueda al cumplir con estándares de accesibilidad.</li>
            </ul>
          </section>

          {/* Sección de Contacto */}
          <section className="contact mt-5">
            <h3 className="section-subtitle">Contáctanos</h3>
            <p>
              Para más información sobre cómo podemos ayudarte a implementar la accesibilidad en tu sitio web, no dudes en ponerte en contacto con nosotros.
            </p>
            <p>
              <a href="mailto:contacto@accesibilidad.com" className="contact-button">Contáctanos</a>
            </p>
          </section>
        </div>
      </div>

      <style>
        {`
          /* Estilos globales */
          .main-wrap {
            background-color: #f8f9fa; /* Fondo suave para todo el contenido */
            padding: 150px;
            min-height: 100vh; /* Asegura que el contenido ocupe todo el alto de la pantalla */
          }

          /* Contenedor de la página */
          .container {
            max-width: 1200px; /* Límite de ancho */
            margin: 0 auto; /* Centra el contenedor */
            padding: 350px;
          }

          /* Títulos de las secciones */
          .section-title {
            font-size: 2.5rem;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }

          /* Descripción introductoria */
          .section-description {
            font-size: 1.2rem;
            color: #666;
            text-align: center;
            line-height: 1.6;
          }

          /* Subtítulos de las secciones */
          .section-subtitle {
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-bottom: 15px;
          }

          /* Estilo para las listas */
          .services ul, .benefits ul {
            font-size: 1.1rem;
            color: #555;
            line-height: 1.6;
            list-style-type: disc;
            padding-left: 30px;
          }

          /* Estilos de contacto */
          .contact-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
          }

          .contact-button:hover {
            background-color: #0056b3; /* Color más oscuro al pasar el mouse */
          }

          /* Márgenes y espaciado */
          .mt-5 {
            margin-top: 5rem;
          }

          /* Ajuste de espaciado y alineación */
          .intro, .about-us, .services, .benefits, .contact {
            padding-left: 20px;
            padding-right: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
