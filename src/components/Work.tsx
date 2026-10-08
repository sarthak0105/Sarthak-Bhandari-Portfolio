import { useState, useCallback, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import DesignLightbox, { DesignScreen } from "./DesignLightbox";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface ProjectItem {
  title: string;
  category: string;
  overview: string;
  tools?: string;
  image: string;
  link?: string;
  designs?: DesignScreen[];
}

const projects: ProjectItem[] = [
  {
    title: "Note Pilot",
    category: "Clinical Documentation UI",
    overview:
      "A clinical documentation workflow covering 5 key stages—consultation recording, transcription, AI generation, review, and editing—built to reduce cognitive load for time-sensitive users.",
    image: "/images/Note Pilot/ui/thumbnail.png",
    link: "https://note-pilotai.vercel.app",
    designs: [
      {
        title: "Clinical Landing Page",
        image: "/images/Note Pilot/ui/Landing page.png",
      },
      {
        title: "Sign In / Authentication",
        image: "/images/Note Pilot/ui/sign in page.png",
      },
      {
        title: "Create a Session Page",
        image: "/images/Note Pilot/ui/Create a Session Page.png",
      },
      {
        title: "Book Appointment — Select Doctor",
        image: "/images/Note Pilot/ui/Book Appointment Select Doctor.png",
      },
      {
        title: "Book Appointment — Department",
        image: "/images/Note Pilot/ui/Book Appointment Department.png",
      },
      {
        title: "Book Appointment — Date & Time",
        image: "/images/Note Pilot/ui/Book Appointment Date and time.png",
      },
      {
        title: "Book Appointment — Details & Confirmation",
        image: "/images/Note Pilot/ui/Book Appointment Details.png",
      },
      {
        title: "Teams & Collaboration",
        image: "/images/Note Pilot/ui/Teams.png",
      },
      {
        title: "Account & Application Settings",
        image: "/images/Note Pilot/ui/Settings.png",
      },
    ],
  },
  {
    title: "DeployZen",
    category: "ML Deployment UI",
    overview:
      "A 5-step machine learning deployment workflow covering model upload, configuration, review, deployment, and status tracking to simplify a technically complex process.",
    image: "/images/Deployzen/ui/thumbnail.svg",
    link: "https://deploy-zen-five.vercel.app",
    designs: [
      {
        title: "Landing Page",
        image: "/images/Deployzen/ui/Landing page.png",
      },
      {
        title: "Dashboard",
        image: "/images/Deployzen/ui/dashboard.png",
      },
      {
        title: "API Test Page",
        image: "/images/Deployzen/ui/Api Test Page.png",
      },
      {
        title: "Upload a Model",
        image: "/images/Deployzen/ui/Upload Model page.png",
      },
      {
        title: "Upload New Model",
        image: "/images/Deployzen/ui/upload new model.png",
      },
      {
        title: "Monitoring",
        image: "/images/Deployzen/ui/Monitoring.png",
      },
    ],
  },
  {
    title: "VOX-AI",
    category: "AI Debate Analysis UI",
    overview:
      "An AI debate-analysis dashboard organized across 5 information areas—summary, topics, sentiment, speaker insights, and transcript—turning dense discussions into scannable insights.",
    image: "/images/Vox AI/thumbnail.svg",
    link: "https://vox-ai-nu.vercel.app/",
    designs: [
      {
        title: "Landing Page",
        image: "/images/Vox AI/Landing page.png",
      },
      {
        title: "Login / Authentication",
        image: "/images/Vox AI/Login Page.png",
      },
      {
        title: "Upload Debate",
        image: "/images/Vox AI/Upload Debate Page.png",
      },
      {
        title: "Debate Analyzer",
        image: "/images/Vox AI/Debate Analyzer Page.png",
      },
      {
        title: "User Profile",
        image: "/images/Vox AI/Profile Page.png",
      },
      {
        title: "Profile Activity",
        image: "/images/Vox AI/Profile Activity Page.png",
      },
      {
        title: "Profile Settings",
        image: "/images/Vox AI/Profile Settings Page.png",
      },
    ],
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Lightbox modal state
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNext() : goToPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="carousel-wrapper">
          {/* Desktop arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div
            className="carousel-track-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-overview">
                          <span className="overview-label">Overview</span>
                          <p>{project.overview}</p>
                        </div>

                        {project.designs && project.designs.length > 0 && (
                          <div className="project-design-badge-container">
                            <button
                              type="button"
                              className="view-designs-btn"
                              onClick={() => setActiveProject(project)}
                              data-cursor="disable"
                            >
                              View UI/UX Screens ({project.designs.length})
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                        hasDesigns={Boolean(project.designs && project.designs.length > 0)}
                        onOpenDesigns={() => setActiveProject(project)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile arrows */}
          <div className="carousel-mobile-nav">
            <button
              className="carousel-arrow-mobile"
              onClick={goToPrev}
              aria-label="Previous project"
            >
              <MdArrowBack />
            </button>
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                  data-cursor="disable"
                />
              ))}
            </div>
            <button
              className="carousel-arrow-mobile"
              onClick={goToNext}
              aria-label="Next project"
            >
              <MdArrowForward />
            </button>
          </div>

          {/* Desktop dots */}
          <div className="carousel-dots carousel-dots-desktop">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox for design review */}
      {activeProject && activeProject.designs && (
        <DesignLightbox
          isOpen={Boolean(activeProject)}
          onClose={() => setActiveProject(null)}
          screens={activeProject.designs}
          projectTitle={activeProject.title}
          projectCategory={activeProject.category}
        />
      )}
    </div>
  );
};

export default Work;
