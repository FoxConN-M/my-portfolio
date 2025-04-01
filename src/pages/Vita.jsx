import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import vita001 from "../assets/vita/001.png";
import vita002 from "../assets/vita/002.png";
import vita003 from "../assets/vita/003.png";
import vita004 from "../assets/vita/004.png";
import vita005 from "../assets/vita/005.png";
import vita006 from "../assets/vita/006.png";
import "./Vita.css";

function Vita() {
  const location = useLocation();
  const [trackPosition, setTrackPosition] = useState(0);
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const images = [vita001, vita002, vita003, vita004, vita005, vita006];

  useEffect(() => {
    if (location.pathname !== "/vita") return;

    const track = document.getElementById("image-track-vita");
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
      let percentage = (mouseDelta / maxDelta) * -60;
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
        const track = document.getElementById("image-track-vita");
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
    <div id="vita-page" className={selectedImage !== null ? "blurred" : ""}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
      </style>
      <div id="cover-vita"></div>
      <div id="cover-text-vita"></div>
      <div id="image-track-vita" data-percentage="0">
        <div className="text-vita">
          <h1>VITA E ALIMENTI</h1>
          <p>A Vita e Alimenti é uma loja especializada no fornecimento de alimentos preparados, com foco principal no consumo domiciliar. Com uma proposta inovadora e prática, a marca visa proporcionar refeições de qualidade e conveniência para seus clientes, atendendo à demanda por opções saborosas e de fácil preparo.</p>
          <p>O design da marca é chamativo e atraente, utilizando cores fortes, como o vermelho e o verde, para destacar a frescor e a energia dos produtos. A combinação dessas cores transmite a ideia de vitalidade e qualidade, convidando os consumidores a experimentar as deliciosas opções oferecidas pela Vita e Alimenti.</p>
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

export default Vita;
