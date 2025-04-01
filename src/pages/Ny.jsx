import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ny001 from "../assets/nyseguranca/001.jpg";
import ny002 from "../assets/nyseguranca/002.png";
import ny003 from "../assets/nyseguranca/003.jpg";
import ny004 from "../assets/nyseguranca/004.png";
import ny005 from "../assets/nyseguranca/005.jpg";
import ny006 from "../assets/nyseguranca/006.png";
import "./Ny.css";

function Ny() {
  const location = useLocation();
  const [trackPosition, setTrackPosition] = useState(0);
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const images = [ny001, ny002, ny003, ny004, ny005, ny006];

  useEffect(() => {
    if (location.pathname !== "/nyseguranca") return;

    const track = document.getElementById("image-track-ny");
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
        const track = document.getElementById("image-track-ny");
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
    <div id="ny-page" className={selectedImage !== null ? "blurred" : ""}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
      </style>
      <div id="cover-ny"></div>
      <div id="cover-text-ny"></div>
      <div id="image-track-ny" data-percentage="0">
        <div className="text-ny">
          <h1>NY SEGURANÇA</h1>
          <p>A N.Y Segurança Patrimonial é uma empresa especializada em segurança e investigações, com sede localizada na Rua Santa Luz 570, Rio de Janeiro, Brasil. Com uma abordagem focada em garantir a proteção e a tranquilidade de seus clientes, a empresa se destaca pela excelência nos serviços prestados.</p>
          <p>A identidade visual da marca é marcada pela combinação de cores fortes, como o amarelo e o preto, transmitindo uma sensação constante de alerta e segurança. Com fontes grossas e um design moderno, <spam className="bold">a N.Y reflete confiança e modernidade, sempre priorizando a eficiência e a proteção em todos os seus processos.</spam></p>
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

export default Ny;
