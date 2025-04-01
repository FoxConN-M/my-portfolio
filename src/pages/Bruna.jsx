import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bruna001 from "../assets/bruna/001.jpg";
import bruna002 from "../assets/bruna/002.jpg";
import bruna003 from "../assets/bruna/003.jpg";
import bruna004 from "../assets/bruna/004.jpg";
import bruna005 from "../assets/bruna/005.jpg";
import bruna006 from "../assets/bruna/006.jpg";
import "./Bruna.css";

function Bruna() {
  const location = useLocation();
  const [trackPosition, setTrackPosition] = useState(0);
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const images = [bruna001, bruna002, bruna003, bruna004, bruna005, bruna006];

  useEffect(() => {
    if (location.pathname !== "/bruna") return;

    const track = document.getElementById("image-track-bruna");
    if (!track) return;

    const handleMouseDown = (e) => {
      setMouseDownAt(e.clientX);
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (mouseDownAt === null) return;

      const mouseDelta = mouseDownAt - e.clientX;
      if (mouseDelta > 1) {
        setIsDragging(true);
      }

      const maxDelta = window.innerWidth / 2;
      let percentage = (mouseDelta / maxDelta) * -80;
      let nextPercentage = trackPosition + percentage;

      nextPercentage = Math.max(-60, Math.min(0, nextPercentage));

      track.dataset.percentage = nextPercentage;

      track.animate(
        { transform: `translate(${nextPercentage}%, 40%)` },
        { duration: 3200, fill: "forwards" }
      );
    };

    const handleMouseUp = () => {
      setMouseDownAt(null);

      setTrackPosition((prev) => {
        const track = document.getElementById("image-track-bruna");
        if (track) {
          return parseFloat(track.dataset.percentage) || prev;
        }
        return prev;
      });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [location.pathname, mouseDownAt, trackPosition]);

  const handleImageClick = (index) => {
    if (isDragging) return;
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div id="bruna-page" className={selectedImage !== null ? "blurred" : ""}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
      </style>
      <div id="cover-bruna"></div>
      <div id="cover-text-bruna"></div>
      <div id="image-track-bruna" data-percentage="0">
        <div className="text-bruna">
          <h1>DRA. BRUNA</h1>
          <p>A Dra. Bruna Lira é uma profissional de excelência, especializada em análises e laudos periciais, oferecendo um serviço que combina precisão científica com uma comunicação clara e acessível. Cada laudo é desenvolvido com rigor técnico, garantindo total confiança para aqueles que precisam de um diagnóstico detalhado e objetivo.</p>
          <p>O design da sua marca reflete seu compromisso com a sofisticação e o minimalismo. A paleta de cores, com tons dourados e beges, transmite uma imagem de profissionalismo e elegância. </p>
          <p>A logo, moderna e minimalista, complementa esse conceito, criando <span className="bold">uma identidade visual que se destaca pela sua clareza e modernidade.</span></p>
        </div>
        {images.map((imgSrc, index) => (
          <img 
            key={index} 
            draggable="false" 
            src={imgSrc} 
            className="image" 
            alt="Gallery" 
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {selectedImage !== null && (
        <div className="overlay" onClick={closeImage}>
          <button className="nav-button left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>+</button>
          <img src={images[selectedImage]} className="enlarged-image" alt="Expanded" />
          <button className="nav-button right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>+</button>
        </div>
      )}
    </div>
  );
}

export default Bruna;