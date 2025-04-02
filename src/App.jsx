import { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import ameiIMG from "./assets/AMEISPORT.jpg";
import brunaIMG from "./assets/DRABRUNA.jpg";
import liberactIMG from "./assets/LIBERACT.jpg";
import mundoIMG from "./assets/MUNDOCEREALISTA.jpg";
import nyIMG from "./assets/NYSEGURANCA.jpg";
import vitaIMG from "./assets/VITAEALIMENTI.jpg";
import About from "./pages/About.jsx";
import Amei from "./pages/Amei.jsx";
import Bruna from "./pages/Bruna.jsx";
import Liberact from "./pages/Liberact.jsx";
import Mundo from "./pages/Mundo.jsx";
import Ny from "./pages/Ny.jsx";
import Vita from "./pages/Vita.jsx";
import "./App.css";

function App() {
  const location = useLocation();
  const [expandedImage, setExpandedImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [trackPosition, setTrackPosition] = useState(0);
  const [closing, setClosing] = useState(false);
  let mouseDownX = 0;
  
  useEffect(() => {
    if (location.pathname === "/") {
      const cover = document.getElementById("cover");
      if (cover) {
        cover.style.animation = "none";
        cover.offsetHeight;
        cover.style.animation = "transition 1s forwards";
      }
    }
  }, [location.pathname]);
  
  const titles = [
    { name: "AMEI SPORT", link: "/amei" },
    { name: "DRA. BRUNA", link: "/bruna" },
    { name: "LIBERACT", link: "/liberact" },
    { name: "MUNDO CEREALISTA", link: "/mundo" },
    { name: "NY SEGURANÇA", link: "/nyseguranca" },
    { name: "VITA E ALIMENTI", link: "/vita" },
  ];

  useEffect(() => {
    const track = document.getElementById("image-track");
    if (!track) return;

    let mouseDownAt = 0;
    let prevPercentage = 0;

    const handleMouseDown = (e) => {
      if (expandedImage) return;
      mouseDownAt = e.clientX;
      mouseDownX = e.clientX;
      setDragging(false);
    };

    const handleMouseMove = (e) => {
      if (mouseDownAt === 0 || expandedImage) return;

      const mouseDelta = mouseDownAt - e.clientX;
      if (Math.abs(mouseDelta) > 10) {
        setDragging(true);
      }

      const maxDelta = window.innerWidth / 2;
      let percentage = (mouseDelta / maxDelta) * -100;
      let nextPercentage = prevPercentage + percentage;

      nextPercentage = Math.max(-100, Math.min(0, nextPercentage));
      setTrackPosition(nextPercentage);

      track.animate(
        { transform: `translate(${nextPercentage}%, 40%)` },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of track.getElementsByClassName("image")) {
        image.animate(
          { objectPosition: `${nextPercentage + 100}% 50%` },
          { duration: 1200, fill: "forwards" }
        );
      }

      const newIndex = Math.round(((100 - nextPercentage * 5) / 100));
      setCurrentIndex(newIndex);
    };

    const handleMouseUp = () => {
      if (expandedImage) return;
      mouseDownAt = 0;
      prevPercentage = parseFloat(track.dataset.percentage || 0);
      setTimeout(() => setDragging(false), 50);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [expandedImage]);

  const handleImageClick = (src, e, index) => {
    if (dragging) return;

    const imgRect = e.target.getBoundingClientRect();
    const image = e.target;
    const objectPosition = getComputedStyle(image).objectPosition;

    setExpandedImage({
      src,
      title: titles[index].name,
      link: titles[index].link,
      initialStyles: {
        objectFit: "cover",
        zIndex: "0",
        left: `${imgRect.left}px`,
        top: `${imgRect.top}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        objectPosition: objectPosition,
      },
    });


    const titleElement = document.getElementById("title");
    if (titleElement) {
      titleElement.style.opacity = 0;
      titleElement.style.transition = "none";
    }

    setTimeout(() => {
      setExpandedImage((prev) => ({ ...prev, animate: true }));
    }, 10);
  };

  const handleCloseImage = () => {
    if (!expandedImage) return;
    setClosing(true);
    setTimeout(() => {
      setExpandedImage((prev) => ({ ...prev, animate: false }));
    }, 200);
    setTimeout(() => {
      setExpandedImage(null);
      setClosing(false);
    }, 700);
  };

  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
      </style>
      <div id="main">
        <div id="cover"></div>
        {expandedImage && (
          <div id="image-full" onClick={handleCloseImage}>
            {!closing && (
              <>
                <Link to={expandedImage.link} id="title">
                  <p>{expandedImage.title}</p>
                </Link>
                <Link to={expandedImage.link}>
                <p className="subtitle">SAIBA MAIS</p>
                </Link>
              </>
            )}
            <img
              draggable="false"
              src={expandedImage.src}
              style={{
                position: "absolute",
                transition: "all 0.5s ease-in-out",
                zIndex: 3,
                left: expandedImage.initialStyles.left,
                top: expandedImage.initialStyles.top,
                width: expandedImage.initialStyles.width,
                height: expandedImage.initialStyles.height,
                objectPosition: expandedImage.initialStyles.objectPosition,
                ...(expandedImage.animate && !closing && {
                  left: "0",
                  top: "0",
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                }),
              }}
              alt="Expanded View"
            />
          </div>
        )}

        <div id="upperMenu">
          <Link to="/" className="works">TRABALHOS</Link>
          <Link to="/about" className="aboutMe">SOBRE & CONTATO</Link>
        </div>

        <div id="upperMenuBackground"></div>

        <div id="image-track" data-percentage={trackPosition} style={{ transform: `translate(${trackPosition}%, 40%)` }}>
          {[ameiIMG, brunaIMG, liberactIMG, mundoIMG, nyIMG, vitaIMG].map((imgSrc, index) => (
            <img
              key={index}
              draggable="false"
              src={imgSrc}
              className="image"
              alt="Gallery"
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick(imgSrc, e, index);
              }}
            />
          ))}
        </div>

        <div id="counter">
          <span>{currentIndex} - 6</span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/about" element={<About />} />
        <Route path="/amei" element={<Amei />} />
        <Route path="/bruna" element={<Bruna />} />
        <Route path="/liberact" element={<Liberact />} />
        <Route path="/mundo" element={<Mundo />} />
        <Route path="/nyseguranca" element={<Ny />} />
        <Route path="/vita" element={<Vita />} />
      </Routes>
    </div>
  );
}

export default App;
