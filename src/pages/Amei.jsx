import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import amei001 from "../assets/amei/001.jpg";
import amei002 from "../assets/amei/002.jpg";
import amei003 from "../assets/amei/003.jpg";
import amei004 from "../assets/amei/004.jpg";
import amei005 from "../assets/amei/005.jpg";
import amei006 from "../assets/amei/006.jpg";
import "./Amei.css";

function Amei() {
  const location = useLocation();
  const [trackPosition, setTrackPosition] = useState(0);
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const images = [amei001, amei002, amei003, amei004, amei005, amei006];

  useEffect(() => {
    if (location.pathname !== "/amei") return;

    const track = document.getElementById("image-track-amei");
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
        const track = document.getElementById("image-track-amei");
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
    <div id="amei-page" className={selectedImage !== null ? "blurred" : ""}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
      </style>
      <div id="cover-amei"></div>
      <div id="cover-text-amei"></div>
      <div id="image-track-amei" data-percentage="0">
        <div className="text-amei">
          <h1>AMEI SPORT</h1>
          <p>Amei Sport é uma marca autêntica de Blumenau com uma sólida trajetória no setor têxtil, dedicada a oferecer roupas esportivas que unem tecnologia, inovação e estilo. Cada peça é projetada para garantir conforto e desempenho, acompanhando o ritmo de quem busca qualidade em suas atividades físicas.</p>
          <p>O design visual da marca reflete essa essência: <span className="bold">moderno, minimalista e estrategicamente pensado para destacar as peças.</span> A paleta de cores mescla tons convidativos com nuances de cinza, criando um equilíbrio visual sofisticado. Essa abordagem não apenas valoriza os produtos, mas também instiga a curiosidade do público, guiando o olhar diretamente para as roupas e incentivando a interação.</p>
          <p>Com uma identidade visual cuidadosamente planejada, Amei Sport comunica dinamismo e elegância, tornando a experiência de descoberta da marca tão envolvente quanto seu propósito.</p>
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

export default Amei;