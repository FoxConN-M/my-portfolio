import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import liberact001 from "../assets/liberact/001.png";
import liberact002 from "../assets/liberact/002.png";
import liberact003 from "../assets/liberact/003.png";
import liberact004 from "../assets/liberact/004.png";
import liberact005 from "../assets/liberact/005.png";
import liberact006 from "../assets/liberact/006.png";
import "./Liberact.css";

function Liberact() {
  const location = useLocation();
  const [trackPosition, setTrackPosition] = useState(0);
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const images = [liberact001, liberact002, liberact003, liberact004, liberact005, liberact006];

  useEffect(() => {
    if (location.pathname !== "/liberact") return;

    const track = document.getElementById("image-track-liberact");
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
        const track = document.getElementById("image-track-liberact");
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
    <div id="liberact-page" className={selectedImage !== null ? "blurred" : ""}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
      </style>
      <div id="cover-liberact"></div>
      <div id="cover-text-liberact"></div>
      <div id="image-track-liberact" data-percentage="0">
        <div className="text-liberact">
          <h1>LIBERACT</h1>
          <p>A Liberact é um espaço dedicado à saúde e bem-estar, com uma filosofia única e inteligente. A marca enxerga o paciente de forma integral, criando uma atmosfera 360° que busca entender a individualidade e as necessidades de cada um. Com um atendimento focado em oferecer uma experiência completa e personalizada, a Liberact coloca o cuidado no centro de sua missão.</p>
          <p>O design da marca reflete esses valores com clareza, destacando a humanização do perfil. A fonte amigável e <spam className="bold">a disposição visual transmitem de forma clara a mensagem de confiança e acolhimento,</spam> alinhando a comunicação à filosofia da Liberact de cuidar de forma atenta e personalizada. </p>
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

export default Liberact;
