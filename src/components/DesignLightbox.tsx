import { useState, useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import "./styles/DesignLightbox.css";

export interface DesignScreen {
  title: string;
  image: string;
}

interface DesignLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  screens: DesignScreen[];
  projectTitle: string;
  projectCategory: string;
}

const DesignLightbox = ({
  isOpen,
  onClose,
  screens,
  projectTitle,
  projectCategory,
}: DesignLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsClosing(false);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 220);
  }, [onClose]);

  const goToNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (screens.length <= 1) return;
      setCurrentIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
    },
    [screens.length]
  );

  const goToPrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (screens.length <= 1) return;
      setCurrentIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
    },
    [screens.length]
  );

  const jumpToIndex = useCallback(
    (index: number, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCurrentIndex(index);
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, goToNext, goToPrev]);

  if (!isOpen && !isClosing) return null;

  const currentScreen = screens[currentIndex];

  const content = (
    <div
      className={`lightbox-overlay ${isVisible ? "lightbox-visible" : ""}`}
      onClick={handleClose}
    >
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Bar */}
        <div className="lightbox-topbar">
          <div className="lightbox-titles">
            <div className="lightbox-project-line">
              <span className="lightbox-project-name">{projectTitle}</span>
              <span className="lightbox-sep">•</span>
              <span className="lightbox-project-cat">{projectCategory}</span>
            </div>
            <h2 className="lightbox-active-screen-title">
              <span className="screen-num-badge">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="screen-title-text" key={currentIndex}>
                {currentScreen ? currentScreen.title : ""}
              </span>
            </h2>
          </div>

          <div className="lightbox-actions">
            <div className="lightbox-counter-pill">
              <span className="counter-curr">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="counter-slash">/</span>
              <span className="counter-tot">
                {String(screens.length).padStart(2, "0")}
              </span>
            </div>
            <button
              className="lightbox-close-btn"
              onClick={handleClose}
              aria-label="Close"
              title="Close (Esc)"
              type="button"
            >
              <MdClose />
            </button>
          </div>
        </div>

        {/* Big Image Stage: Render ONLY current slide + immediate neighbors */}
        <div className="lightbox-stage">
          {screens.length > 1 && (
            <button
              className="lightbox-stage-arrow lightbox-stage-arrow-prev"
              onClick={goToPrev}
              aria-label="Previous screen"
              title="Previous screen (←)"
              type="button"
            >
              <MdArrowBack />
            </button>
          )}

          <div className="lightbox-canvas">
            {currentScreen && (
              <img
                src={encodeURI(currentScreen.image)}
                alt={`${projectTitle} - ${currentScreen.title}`}
                className="lightbox-active-img"
                key={currentScreen.image}
                decoding="async"
              />
            )}
          </div>

          {screens.length > 1 && (
            <button
              className="lightbox-stage-arrow lightbox-stage-arrow-next"
              onClick={goToNext}
              aria-label="Next screen"
              title="Next screen (→)"
              type="button"
            >
              <MdArrowForward />
            </button>
          )}
        </div>

        {/* Thumbnail Filmstrip */}
        {screens.length > 1 && (
          <div className="lightbox-filmstrip">
            {screens.map((screen, i) => (
              <button
                key={screen.image}
                className={`lightbox-filmstrip-thumb ${
                  i === currentIndex ? "active" : ""
                }`}
                onClick={(e) => jumpToIndex(i, e)}
                aria-label={`View ${screen.title}`}
                title={screen.title}
                type="button"
              >
                <img src={encodeURI(screen.image)} alt={screen.title} />
                <span className="filmstrip-label">{screen.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default memo(DesignLightbox);
