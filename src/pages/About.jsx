import React, { useEffect } from "react";
import "./About.css";

function About() {
  useEffect(() => {
    const cardsContainer = document.getElementById("cards");
    if (!cardsContainer) return;

    const handleMouseMove = (e) => {
      document.querySelectorAll(".card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    cardsContainer.addEventListener("mousemove", handleMouseMove);
    return () => cardsContainer.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div id="about-page">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
      </style>
      <div id="cards">
        <div className="card" onClick={() => window.open("mailto:victormenezes1121@gmail.com", "_blank")}>
          <div className="card-border"></div>
          <div className="card-content">
          <svg xmlns="http://www.w3.org/2000/svg" className="email-icon" viewBox="0 0 512 512">
          <path d="M215.4 96L144 96l-36.2 0L96 96l0 8.8L96 144l0 40.4 0 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3 48 96c0-26.5 21.5-48 48-48l76.6 0 49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48 416 48c26.5 0 48 21.5 48 48l0 44.3 22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4l0-89 0-40.4 0-39.2 0-8.8-11.8 0L368 96l-71.4 0-81.3 0zM0 448L0 242.1 217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1 512 448s0 0 0 0c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64c0 0 0 0 0 0zM176 160l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
          </svg>
            <a className="info-email">Email</a>
          </div>
        </div>
        <div className="card" onClick={() => window.open("https://w.app/nwdrpa", "_blank")}>
          <div className="card-border"></div>
          <div className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="whats-icon" viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            <a className="info">Whatsapp</a>
          </div>
        </div>
        <div className="card" onClick={() => window.open("https://www.linkedin.com/in/victor-menezes-14031b245/", "_blank")}>
          <div className="card-border"></div>
          <div className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="link-icon" viewBox="0 0 448 512">
            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
            </svg>
            <a className="info">LinkedIn</a>
          </div>
        </div>
      </div>
      <div id="about-me-text">
        <div id="big-text">
          <div className="line">
            <a href="https://www.behance.net/victormenezes8" target="_blank" rel="noopener noreferrer" className="word fancy2">DESIGNER</a>
            <a href="https://www.behance.net/victormenezes8" target="_blank" rel="noopener noreferrer" className="word fancy2">GRÁFICO</a>
          </div>
          <div className="line">
            <p className="word">E</p>
            <a href="https://github.com/FoxConN-M" target="_blank" rel="noopener noreferrer" className="word fancy1">DESENVOLVEDOR</a>
          </div>
          <div className="line">
            <a href="https://github.com/FoxConN-M" target="_blank" rel="noopener noreferrer" className="word fancy1">FULLSTACK</a>
          </div>
        </div>
        <div className="text-cover"></div>
        <div className="text">
          <p>Sou um Desenvolvedor Full-Stack e Designer Gráfico com uma combinação única de habilidades técnicas e criativas. Com um Bacharelado em Design Gráfico pela UNINTER e uma formação abrangente tanto em desenvolvimento front-end quanto back-end, aplico uma abordagem centrada no usuário em tudo o que faço.</p>
          <p>Como Desenvolvedor Full-Stack, sou especializado em FastAPI e React.js, além de ter experiência no design e gerenciamento de esquemas de banco de dados PostgreSQL e MariaDB. Tenho mais de um ano de experiência em desenvolvimento web, iniciando com soluções front-end antes de expandir para o back-end. Através da VainaWeb, aprimorei minhas habilidades e estou atualmente em constante evolução.</p>
          <p>Além da minha experiência em desenvolvimento, atuo como Designer Gráfico desde 2018, especializado em design para mídias sociais, criação de identidade visual e produção de conteúdo digital. Também tenho paixão por ilustração, agregando um toque criativo a todos os meus projetos. Essa combinação de design e desenvolvimento me permite criar experiências digitais visualmente envolventes e tecnicamente eficientes, equilibrando forma e função.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
