import { useState, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/Work.css";
import DesignLightbox, { DesignScreen } from "./DesignLightbox";
import {
  graphicDesignProjects,
  graphicDesignCategories,
  GraphicDesignItem,
} from "../data/graphicDesignData";
import {
  MdOutlinePalette,
  MdLayers,
  MdArrowForward,
  MdClose,
  MdZoomIn,
  MdArrowOutward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

export interface UiUxProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  overview: string;
  keyFeatures: string[];
  tools: string[];
  image: string;
  link?: string;
  designs: DesignScreen[];
}

const uiuxProjects: UiUxProjectItem[] = [
  {
    id: "note-pilot",
    number: "01",
    title: "Note Pilot",
    category: "Clinical Documentation UI",
    overview:
      "A clinical documentation workflow covering 5 key stages—consultation recording, transcription, AI generation, review, and editing—built to reduce cognitive load for time-sensitive physicians.",
    keyFeatures: [
      "5-Stage Clinical Pipeline",
      "Real-Time AI Transcription",
      "Doctor & Department Scheduling",
      "Teams & Secure Audit Logs",
    ],
    tools: ["Figma", "Next.js", "React", "TypeScript", "Gemini API"],
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
    id: "deployzen",
    number: "02",
    title: "DeployZen",
    category: "ML Deployment UI",
    overview:
      "A 5-step machine learning deployment workflow covering model upload, configuration, review, deployment, and status tracking to simplify a technically complex process.",
    keyFeatures: [
      "5-Step Model Pipeline",
      "ONNX Runtime Integration",
      "Hardware Acceleration Toggle",
      "Model Performance Metrics",
    ],
    tools: ["Figma", "Next.js", "FastAPI", "Python", "ONNX Runtime"],
    image: "/images/Deployzen/ui/thumbnail.svg",
    link: "https://deploy-zen-five.vercel.app",
    designs: [
      {
        title: "Landing Page",
        image: "/images/Deployzen/ui/Landing page.png",
      },
      {
        title: "Dashboard Overview",
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
        title: "Upload New Model Workflow",
        image: "/images/Deployzen/ui/upload new model.png",
      },
      {
        title: "Model Monitoring",
        image: "/images/Deployzen/ui/Monitoring.png",
      },
    ],
  },
  {
    id: "vox-ai",
    number: "03",
    title: "VOX-AI",
    category: "AI Debate Platform UI",
    overview:
      "A 4-step AI debate analysis workflow covering audio upload, transcription, metric evaluation, and a comprehensive debate breakdown with actionable feedback.",
    keyFeatures: [
      "4-Step Audio Evaluation",
      "Side-by-Side Speaker Analytics",
      "Interactive Speech Visualizer",
      "Debate History & Trends",
    ],
    tools: ["Figma", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/Vox AI/thumbnail.svg",
    link: "https://vox-ai-nine.vercel.app",
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

type CraftModalType = "uiux" | "graphic" | null;

const Work = () => {
  // Pop-up modal state: null = closed (Gateway cards sit on main page)
  const [activeCraftModal, setActiveCraftModal] = useState<CraftModalType>(null);

  // Graphic design category filter inside Graphic Modal
  const [graphicCategory, setGraphicCategory] = useState<string>("all");

  // Horizontal Carousel Slide Indices:
  const [uiuxSlideIndex, setUiUxSlideIndex] = useState<number>(0);
  const [graphicSlideIndex, setGraphicSlideIndex] = useState<number>(0);

  // UI/UX Fullscreen Lightbox
  const [activeUiUxProject, setActiveUiUxProject] = useState<UiUxProjectItem | null>(null);

  // Graphic Design Fullscreen Lightbox
  const [selectedGraphicItem, setSelectedGraphicItem] = useState<GraphicDesignItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  // Filtered graphic design projects
  const filteredGraphicProjects = useMemo(() => {
    if (graphicCategory === "all") {
      return graphicDesignProjects;
    }
    return graphicDesignProjects.filter(
      (item) => item.categorySlug === graphicCategory
    );
  }, [graphicCategory]);

  // Reset slide index when category changes
  useEffect(() => {
    setGraphicSlideIndex(0);
  }, [graphicCategory]);

  // Open Craft Pop-up Modal
  const handleOpenCraft = (craft: "uiux" | "graphic") => {
    setActiveCraftModal(craft);
    if (craft === "uiux") {
      setUiUxSlideIndex(0);
    } else {
      setGraphicSlideIndex(0);
    }
  };

  const handleCloseCraft = () => {
    setActiveCraftModal(null);
  };

  // UI/UX Carousel Navigation: 2 visible on desktop, 1 on mobile
  const maxUiUxIndex = typeof window !== "undefined" && window.innerWidth < 820
    ? uiuxProjects.length - 1
    : Math.max(0, uiuxProjects.length - 2);

  const nextUiUxSlide = useCallback(() => {
    setUiUxSlideIndex((prev) => (prev >= maxUiUxIndex ? 0 : prev + 1));
  }, [maxUiUxIndex]);

  const prevUiUxSlide = useCallback(() => {
    setUiUxSlideIndex((prev) => (prev <= 0 ? maxUiUxIndex : prev - 1));
  }, [maxUiUxIndex]);

  // Graphic Carousel Navigation
  const maxGraphicIndex = typeof window !== "undefined" && window.innerWidth < 820
    ? Math.max(0, filteredGraphicProjects.length - 1)
    : Math.max(0, filteredGraphicProjects.length - 2);

  const nextGraphicSlide = useCallback(() => {
    if (maxGraphicIndex <= 0) return;
    setGraphicSlideIndex((prev) => (prev >= maxGraphicIndex ? 0 : prev + 1));
  }, [maxGraphicIndex]);

  const prevGraphicSlide = useCallback(() => {
    if (maxGraphicIndex <= 0) return;
    setGraphicSlideIndex((prev) => (prev <= 0 ? maxGraphicIndex : prev - 1));
  }, [maxGraphicIndex]);

  // Graphic design lightbox index & navigation
  const currentGraphicIndex = useMemo(() => {
    if (!selectedGraphicItem) return -1;
    return filteredGraphicProjects.findIndex(
      (item) => item.id === selectedGraphicItem.id
    );
  }, [selectedGraphicItem, filteredGraphicProjects]);

  const handleNextGraphicLightbox = useCallback(() => {
    if (currentGraphicIndex === -1 || filteredGraphicProjects.length <= 1) return;
    const nextIdx = (currentGraphicIndex + 1) % filteredGraphicProjects.length;
    setSelectedGraphicItem(filteredGraphicProjects[nextIdx]);
    setActiveGalleryIndex(0);
  }, [currentGraphicIndex, filteredGraphicProjects]);

  const handlePrevGraphicLightbox = useCallback(() => {
    if (currentGraphicIndex === -1 || filteredGraphicProjects.length <= 1) return;
    const prevIdx =
      (currentGraphicIndex - 1 + filteredGraphicProjects.length) %
      filteredGraphicProjects.length;
    setSelectedGraphicItem(filteredGraphicProjects[prevIdx]);
    setActiveGalleryIndex(0);
  }, [currentGraphicIndex, filteredGraphicProjects]);

  // Multi-slide navigation inside Graphic Lightbox
  const hasMultipleSlides = Boolean(
    selectedGraphicItem?.galleryImages &&
      selectedGraphicItem.galleryImages.length > 1
  );

  const handleNextSlide = useCallback(() => {
    if (!selectedGraphicItem?.galleryImages) return;
    const total = selectedGraphicItem.galleryImages.length;
    setActiveGalleryIndex((prev) => (prev + 1) % total);
  }, [selectedGraphicItem]);

  const handlePrevSlide = useCallback(() => {
    if (!selectedGraphicItem?.galleryImages) return;
    const total = selectedGraphicItem.galleryImages.length;
    setActiveGalleryIndex((prev) => (prev - 1 + total) % total);
  }, [selectedGraphicItem]);

  // Combined stage arrow navigation:
  // If artwork has multiple slides, advance slide!
  // If single slide, navigate to next artwork!
  const handleNextStage = useCallback(() => {
    if (hasMultipleSlides) {
      handleNextSlide();
    } else {
      handleNextGraphicLightbox();
    }
  }, [hasMultipleSlides, handleNextSlide, handleNextGraphicLightbox]);

  const handlePrevStage = useCallback(() => {
    if (hasMultipleSlides) {
      handlePrevSlide();
    } else {
      handlePrevGraphicLightbox();
    }
  }, [hasMultipleSlides, handlePrevSlide, handlePrevGraphicLightbox]);

  // Listen to navigation events from Navbar
  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<"uiux" | "graphic">;
      if (customEvent.detail) {
        handleOpenCraft(customEvent.detail);
      }
    };

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#graphic-design") {
        handleOpenCraft("graphic");
      }
    };

    window.addEventListener("portfolio-tab-change", handleTabChange);
    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => {
      window.removeEventListener("portfolio-tab-change", handleTabChange);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  // Keyboard navigation & ESC handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Fullscreen Graphic Lightbox
      if (selectedGraphicItem) {
        if (e.key === "Escape") {
          setSelectedGraphicItem(null);
        } else if (e.key === "ArrowRight") {
          handleNextStage();
        } else if (e.key === "ArrowLeft") {
          handlePrevStage();
        }
        return;
      }

      // 2. Fullscreen UI/UX Lightbox handled by DesignLightbox component itself

      // 3. Pop-up Modals
      if (activeCraftModal === "uiux" && !activeUiUxProject) {
        if (e.key === "Escape") {
          handleCloseCraft();
        } else if (e.key === "ArrowRight") {
          nextUiUxSlide();
        } else if (e.key === "ArrowLeft") {
          prevUiUxSlide();
        }
      } else if (activeCraftModal === "graphic" && !selectedGraphicItem) {
        if (e.key === "Escape") {
          handleCloseCraft();
        } else if (e.key === "ArrowRight") {
          nextGraphicSlide();
        } else if (e.key === "ArrowLeft") {
          prevGraphicSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedGraphicItem,
    handleNextStage,
    handlePrevStage,
    activeCraftModal,
    activeUiUxProject,
    nextUiUxSlide,
    prevUiUxSlide,
    nextGraphicSlide,
    prevGraphicSlide,
  ]);

  // Lock body scroll & hide fixed socials when any modal or lightbox is open
  useEffect(() => {
    const isAnyModalOpen =
      activeCraftModal !== null ||
      Boolean(activeUiUxProject) ||
      Boolean(selectedGraphicItem);

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("hide-fixed-socials");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("hide-fixed-socials");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("hide-fixed-socials");
    };
  }, [activeCraftModal, activeUiUxProject, selectedGraphicItem]);

  return (
    <div className="work-section" id="work">
      {/* Anchor for direct graphic design navigation */}
      <span id="graphic-design" className="work-hash-anchor" aria-hidden="true" />

      <div className="work-container section-container">
        {/* ═══════════════════════════════════════════════════════════
            PERMANENT GATEWAY CARDS ON MAIN PAGE
            Both cards use unified mint & glass aesthetic (#5eead4)
            ═══════════════════════════════════════════════════════════ */}
        <div className="gateway-view-container">
          {/* Section Header */}
          <div className="work-header">
            <div className="work-badge-pill">
              <span>Selected Portfolio</span>
            </div>
            <h2 className="work-title">
              Featured <span>Work</span>
            </h2>
            <p className="work-subtitle">
              Select a discipline to explore tailored product case studies or brand design systems.
            </p>
          </div>

          {/* The Two Grand Discipline Cards */}
          <div className="gateway-cards-grid">
            {/* Card 1: UI/UX Design */}
            <div
              className="gateway-card"
              onClick={() => handleOpenCraft("uiux")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenCraft("uiux");
                }
              }}
              data-cursor="disable"
            >
              <div className="gateway-card-glow" />

              <div className="gateway-card-header">
                <div className="gateway-icon-badge">
                  <MdLayers />
                </div>
                <div className="gateway-header-right">
                  <span className="gateway-count-pill">
                    {uiuxProjects.length} Case Studies • 21 Screens
                  </span>
                  <span className="gateway-corner-arrow" aria-hidden="true">
                    <MdArrowOutward />
                  </span>
                </div>
              </div>

              <div className="gateway-card-body">
                <span className="gateway-kicker">01 / DIGITAL PRODUCTS</span>
                <h3 className="gateway-card-title">UI/UX Design</h3>
                <p className="gateway-card-desc">
                  User-centered product design, clinical documentation systems, ML deployment pipelines, and interactive analytics dashboards.
                </p>

                <div className="gateway-tags">
                  <span>Clinical Systems</span>
                  <span>Prototyping</span>
                  <span>Design Systems</span>
                  <span>User Flows</span>
                </div>
              </div>

              {/* Visual Teaser Preview */}
              <div className="gateway-visual-preview">
                <div className="preview-top-dots">
                  <span className="dot dot-1" />
                  <span className="dot dot-2" />
                  <span className="dot dot-3" />
                  <span className="preview-frame-label">Interactive UI Workflows</span>
                </div>
                <div className="preview-image-box">
                  <img
                    src="/images/Note Pilot/ui/thumbnail.png"
                    alt="UI/UX Preview"
                    className="preview-img"
                  />
                </div>
              </div>

              <div className="gateway-card-footer">
                <span className="gateway-cta-btn">
                  <span>Explore UI/UX Work</span>
                  <MdArrowForward className="btn-arrow" />
                </span>
              </div>
            </div>

            {/* Card 2: Graphic Design */}
            <div
              className="gateway-card"
              onClick={() => handleOpenCraft("graphic")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenCraft("graphic");
                }
              }}
              data-cursor="disable"
            >
              <div className="gateway-card-glow" />

              <div className="gateway-card-header">
                <div className="gateway-icon-badge">
                  <MdOutlinePalette />
                </div>
                <div className="gateway-header-right">
                  <span className="gateway-count-pill">
                    {graphicDesignProjects.length} Visual Works • Creative Lead
                  </span>
                  <span className="gateway-corner-arrow" aria-hidden="true">
                    <MdArrowOutward />
                  </span>
                </div>
              </div>

              <div className="gateway-card-body">
                <span className="gateway-kicker">02 / VISUAL COMMUNICATION</span>
                <h3 className="gateway-card-title">Graphic Design</h3>
                <p className="gateway-card-desc">
                  Brand identities, marketing campaign art, high-impact typography posters, vector illustrations, and visual design systems.
                </p>

                <div className="gateway-tags">
                  <span>Brand Identity</span>
                  <span>Visual Systems</span>
                  <span>Typography</span>
                  <span>Campaign Art</span>
                </div>
              </div>

              {/* Visual Teaser Preview */}
              <div className="gateway-visual-preview">
                <div className="preview-top-dots">
                  <span className="dot dot-1" />
                  <span className="dot dot-2" />
                  <span className="dot dot-3" />
                  <span className="preview-frame-label">Brand &amp; Campaign Art</span>
                </div>
                <div className="preview-image-box">
                  <img
                    src="/images/graphic-design/Graphics/Illuminate poster.png"
                    alt="Graphic Design Preview"
                    className="preview-img"
                  />
                </div>
              </div>

              <div className="gateway-card-footer">
                <span className="gateway-cta-btn">
                  <span>Explore Graphic Design</span>
                  <MdArrowForward className="btn-arrow" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CRAFT SHOWCASE POP-UP MODAL (ON THE SAME PAGE)
          Rendered via React Portal with clean frosted backdrop
          ═══════════════════════════════════════════════════════════ */}
      {activeCraftModal &&
        createPortal(
          <div
            className="craft-modal-backdrop"
            onClick={handleCloseCraft}
            role="dialog"
            aria-modal="true"
            aria-label={
              activeCraftModal === "uiux"
                ? "UI/UX Design Projects"
                : "Graphic Design Showcase"
            }
          >
            <div
              className="craft-modal-window"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar */}
              <div className="craft-modal-header">
                <div className="craft-modal-header-left">
                  <span className="craft-modal-kicker">
                    {activeCraftModal === "uiux"
                      ? "01 / DIGITAL PRODUCTS"
                      : "02 / VISUAL COMMUNICATION"}
                  </span>
                  <h2 className="craft-modal-title">
                    {activeCraftModal === "uiux" ? (
                      <>
                        UI/UX <span>Case Studies</span>
                      </>
                    ) : (
                      <>
                        Graphic <span>Design</span>
                      </>
                    )}
                  </h2>
                </div>

                <div className="craft-modal-header-actions">
                  {/* Discipline Switcher Button */}
                  <button
                    type="button"
                    className="craft-modal-switch-btn"
                    onClick={() => {
                      if (activeCraftModal === "uiux") {
                        handleOpenCraft("graphic");
                      } else {
                        handleOpenCraft("uiux");
                      }
                    }}
                    data-cursor="disable"
                    title={
                      activeCraftModal === "uiux"
                        ? "Switch to Graphic Design"
                        : "Switch to UI/UX"
                    }
                  >
                    {activeCraftModal === "uiux" ? (
                      <>
                        <MdOutlinePalette />
                        <span>Switch to Graphic Design ({graphicDesignProjects.length})</span>
                      </>
                    ) : (
                      <>
                        <MdLayers />
                        <span>Switch to UI/UX ({uiuxProjects.length})</span>
                      </>
                    )}
                  </button>

                  {/* Close Pop-up Button */}
                  <button
                    type="button"
                    className="craft-modal-close-btn"
                    onClick={handleCloseCraft}
                    aria-label="Close modal (Esc)"
                    title="Close (Esc)"
                    data-cursor="disable"
                  >
                    <MdClose />
                  </button>
                </div>
              </div>

              {/* ───────────────────────────────────────────────────
                  UI/UX MODAL BODY: HORIZONTAL 2-UP SLIDING CAROUSEL
                  Cards 1 & 2 visible side-by-side, 3rd revealed by arrow
                  ─────────────────────────────────────────────────── */}
              {activeCraftModal === "uiux" && (
                <div className="craft-modal-body uiux-modal-body">
                  {/* Controls Row: Quick Tabs + Arrow Nav */}
                  <div className="craft-modal-subbar">
                    <div className="craft-tab-pills" role="tablist">
                      {uiuxProjects.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          className={`craft-tab-pill ${
                            (idx === 0 && uiuxSlideIndex === 0) ||
                            (idx === 1 && (uiuxSlideIndex === 0 || uiuxSlideIndex === 1)) ||
                            (idx === 2 && uiuxSlideIndex === 1)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            if (idx === 0) setUiUxSlideIndex(0);
                            else if (idx === 2) setUiUxSlideIndex(1);
                            else setUiUxSlideIndex(0);
                          }}
                          data-cursor="disable"
                        >
                          <span className="pill-idx">{p.number}</span>
                          <span className="pill-label">{p.title}</span>
                          <span className="pill-badge">{p.designs.length} Screens</span>
                        </button>
                      ))}
                    </div>

                    <div className="craft-nav-controls">
                      <button
                        type="button"
                        className="carousel-nav-btn"
                        onClick={prevUiUxSlide}
                        aria-label="Previous project (Arrow Left)"
                        title="Previous project (Arrow Left)"
                        data-cursor="disable"
                      >
                        <MdChevronLeft />
                      </button>
                      <span className="craft-page-indicator">
                        {uiuxSlideIndex === 0 ? "Cards 01 - 02" : "Cards 02 - 03"} / 03
                      </span>
                      <button
                        type="button"
                        className="carousel-nav-btn"
                        onClick={nextUiUxSlide}
                        aria-label="Next project (Arrow Right)"
                        title="Next project (Arrow Right)"
                        data-cursor="disable"
                      >
                        <MdChevronRight />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Carousel Viewport */}
                  <div className="craft-carousel-viewport">
                    <div
                      className="craft-carousel-track"
                      style={
                        {
                          "--slide-idx": uiuxSlideIndex,
                        } as React.CSSProperties
                      }
                    >
                      {uiuxProjects.map((project, pIdx) => (
                        <div
                          key={project.id}
                          className="craft-carousel-card uiux-card"
                        >
                          {/* Card Top Metadata */}
                          <div className="uiux-card-top-row">
                            <span className="uiux-card-idx">0{pIdx + 1}</span>
                            <span className="uiux-card-cat-pill">
                              {project.category}
                            </span>
                            <span className="uiux-card-screens-count">
                              {project.designs.length} Screens
                            </span>
                          </div>

                          {/* Crisp Thumbnail Stage (Opens Lightbox on click) */}
                          <div
                            className="uiux-card-thumb-frame"
                            onClick={() => setActiveUiUxProject(project)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setActiveUiUxProject(project);
                              }
                            }}
                            data-cursor="disable"
                            title={`Inspect ${project.title} screens`}
                          >
                            <img
                              src={project.image}
                              alt={`${project.title} thumbnail`}
                              className="uiux-card-thumb-img"
                              loading="lazy"
                            />
                            <div className="card-thumb-hover-badge">
                              <MdZoomIn />
                              <span>View Designs ({project.designs.length} Screens)</span>
                            </div>
                          </div>

                          {/* Card Content Details */}
                          <div className="uiux-card-body">
                            <h3 className="uiux-card-title">{project.title}</h3>
                            <p className="uiux-card-desc">{project.overview}</p>

                            <div className="uiux-features-section">
                              <span className="sub-label">Key Workflow Stages:</span>
                              <div className="uiux-features-wrap">
                                {project.keyFeatures.map((feat) => (
                                  <span key={feat} className="uiux-feat-chip">
                                    {feat}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="uiux-tools-section">
                              <span className="sub-label">Tools &amp; Stack:</span>
                              <div className="uiux-tools-wrap">
                                {project.tools.map((t) => (
                                  <span key={t} className="uiux-tool-chip">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="uiux-card-actions">
                            <button
                              type="button"
                              className="btn-modal-primary"
                              onClick={() => setActiveUiUxProject(project)}
                              data-cursor="disable"
                            >
                              <MdZoomIn />
                              <span>View UI/UX Screens ({project.designs.length})</span>
                            </button>

                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-modal-secondary"
                                data-cursor="disable"
                              >
                                <span>Live Web App</span>
                                <MdArrowOutward />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────
                  GRAPHIC DESIGN MODAL BODY: SPACIOUS 2-UP SLIDING CAROUSEL
                  Zero clustering, crisp card frames & category filters
                  ─────────────────────────────────────────────────── */}
              {activeCraftModal === "graphic" && (
                <div className="craft-modal-body graphic-modal-body">
                  {/* Controls Row: Category Filters + Arrow Nav */}
                  <div className="craft-modal-subbar">
                    <div className="craft-tab-pills" role="tablist">
                      {graphicDesignCategories.map((cat) => {
                        const count =
                          cat.slug === "all"
                            ? graphicDesignProjects.length
                            : graphicDesignProjects.filter(
                                (p) => p.categorySlug === cat.slug
                              ).length;
                        return (
                          <button
                            key={cat.slug}
                            type="button"
                            className={`craft-tab-pill ${
                              graphicCategory === cat.slug ? "active" : ""
                            }`}
                            onClick={() => setGraphicCategory(cat.slug)}
                            data-cursor="disable"
                          >
                            <span className="pill-label">{cat.label}</span>
                            <span className="pill-badge">{count}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="craft-nav-controls">
                      <button
                        type="button"
                        className="carousel-nav-btn"
                        onClick={prevGraphicSlide}
                        disabled={maxGraphicIndex <= 0}
                        aria-label="Previous artwork (Arrow Left)"
                        title="Previous artwork (Arrow Left)"
                        data-cursor="disable"
                      >
                        <MdChevronLeft />
                      </button>
                      <span className="craft-page-indicator">
                        Artwork {graphicSlideIndex + 1} -{" "}
                        {Math.min(
                          filteredGraphicProjects.length,
                          graphicSlideIndex + 2
                        )}{" "}
                        of {filteredGraphicProjects.length}
                      </span>
                      <button
                        type="button"
                        className="carousel-nav-btn"
                        onClick={nextGraphicSlide}
                        disabled={maxGraphicIndex <= 0}
                        aria-label="Next artwork (Arrow Right)"
                        title="Next artwork (Arrow Right)"
                        data-cursor="disable"
                      >
                        <MdChevronRight />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Graphic Carousel Viewport */}
                  <div className="craft-carousel-viewport">
                    <div
                      className="craft-carousel-track"
                      style={
                        {
                          "--slide-idx": graphicSlideIndex,
                        } as React.CSSProperties
                      }
                    >
                      {filteredGraphicProjects.map((project) => (
                        <div
                          key={project.id}
                          className="craft-carousel-card graphic-card"
                        >
                          {/* Top Row */}
                          <div className="graphic-card-top-row">
                            <span className="graphic-card-cat-badge">
                              {project.category}
                            </span>
                            {project.galleryImages &&
                              project.galleryImages.length > 1 && (
                                <span className="graphic-card-multi-badge">
                                  {project.galleryImages.length} Slides
                                </span>
                              )}
                          </div>

                          {/* Crisp Artwork Frame (Opens full inspection modal) */}
                          <div
                            className="graphic-card-thumb-frame"
                            onClick={() => {
                              setSelectedGraphicItem(project);
                              setActiveGalleryIndex(0);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedGraphicItem(project);
                                setActiveGalleryIndex(0);
                              }
                            }}
                            data-cursor="disable"
                            title={`Inspect artwork: ${project.title}`}
                          >
                            <img
                              src={encodeURI(project.image)}
                              alt={project.title}
                              className="graphic-card-thumb-img"
                              loading="lazy"
                            />
                            <div className="card-thumb-hover-badge">
                              <MdZoomIn />
                              <span>Inspect Artwork</span>
                            </div>
                          </div>

                          {/* Card Content Details */}
                          <div className="graphic-card-body">
                            {project.clientOrContext && (
                              <span className="graphic-card-kicker">
                                {project.clientOrContext}
                              </span>
                            )}
                            <h3 className="graphic-card-title">{project.title}</h3>
                            <p className="graphic-card-desc">{project.description}</p>

                            <div className="graphic-tools-wrap">
                              {project.tags.map((tag) => (
                                <span key={tag} className="graphic-tag-chip">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="graphic-card-actions">
                            <button
                              type="button"
                              className="btn-modal-primary"
                              onClick={() => {
                                setSelectedGraphicItem(project);
                                setActiveGalleryIndex(0);
                              }}
                              data-cursor="disable"
                            >
                              <MdZoomIn />
                              <span>Inspect Artwork</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* ── UI/UX Design Lightbox Modal ── */}
      {activeUiUxProject && activeUiUxProject.designs && (
        <DesignLightbox
          isOpen={Boolean(activeUiUxProject)}
          onClose={() => setActiveUiUxProject(null)}
          screens={activeUiUxProject.designs}
          projectTitle={activeUiUxProject.title}
          projectCategory={activeUiUxProject.category}
        />
      )}

      {/* ── Graphic Design Fullscreen Lightbox Modal ── */}
      {selectedGraphicItem &&
        createPortal(
          <div
            className="graphic-modal-backdrop"
            onClick={() => setSelectedGraphicItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedGraphicItem.title}
          >
            <div
              className="graphic-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-top-bar">
                <div className="modal-title-wrap">
                  <span className="modal-category-badge">
                    {selectedGraphicItem.category}
                  </span>
                  <h3 className="modal-title">{selectedGraphicItem.title}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedGraphicItem(null)}
                  aria-label="Close modal"
                  data-cursor="disable"
                >
                  <MdClose />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <div className="modal-image-stage">
                  {/* Left Floating Arrow on Stage */}
                  <button
                    type="button"
                    className="modal-stage-arrow modal-stage-arrow-prev"
                    onClick={handlePrevStage}
                    aria-label={
                      hasMultipleSlides ? "Previous slide image" : "Previous artwork"
                    }
                    title={
                      hasMultipleSlides
                        ? "Previous slide image (Arrow Left)"
                        : "Previous artwork (Arrow Left)"
                    }
                    data-cursor="disable"
                  >
                    <MdChevronLeft />
                  </button>

                  <img
                    src={encodeURI(
                      selectedGraphicItem.galleryImages &&
                        selectedGraphicItem.galleryImages[activeGalleryIndex]
                        ? selectedGraphicItem.galleryImages[activeGalleryIndex]
                        : selectedGraphicItem.image
                    )}
                    alt={`${selectedGraphicItem.title}${
                      selectedGraphicItem.galleryImages
                        ? ` - Slide ${activeGalleryIndex + 1}`
                        : ""
                    }`}
                    className="modal-image"
                  />

                  {/* Right Floating Arrow on Stage */}
                  <button
                    type="button"
                    className="modal-stage-arrow modal-stage-arrow-next"
                    onClick={handleNextStage}
                    aria-label={
                      hasMultipleSlides ? "Next slide image" : "Next artwork"
                    }
                    title={
                      hasMultipleSlides
                        ? "Next slide image (Arrow Right)"
                        : "Next artwork (Arrow Right)"
                    }
                    data-cursor="disable"
                  >
                    <MdChevronRight />
                  </button>

                  {/* Multi-Slide Switcher Strip with Arrows */}
                  {hasMultipleSlides &&
                    selectedGraphicItem.galleryImages && (
                      <div className="modal-slide-strip">
                        <button
                          type="button"
                          className="slide-strip-arrow-btn"
                          onClick={handlePrevSlide}
                          aria-label="Previous slide"
                          title="Previous slide (Arrow Left)"
                          data-cursor="disable"
                        >
                          <MdChevronLeft />
                        </button>

                        <span className="slide-strip-counter">
                          Slide {activeGalleryIndex + 1} of{" "}
                          {selectedGraphicItem.galleryImages.length}
                        </span>

                        <div className="slide-strip-pills">
                          {selectedGraphicItem.galleryImages.map((slide, sIdx) => (
                            <button
                              key={slide}
                              type="button"
                              className={`slide-strip-btn ${
                                activeGalleryIndex === sIdx ? "active" : ""
                              }`}
                              onClick={() => setActiveGalleryIndex(sIdx)}
                              data-cursor="disable"
                            >
                              0{sIdx + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="slide-strip-arrow-btn"
                          onClick={handleNextSlide}
                          aria-label="Next slide"
                          title="Next slide (Arrow Right)"
                          data-cursor="disable"
                        >
                          <MdChevronRight />
                        </button>
                      </div>
                    )}
                </div>

                {/* Artwork Metadata Sidebar */}
                <div className="modal-details-pane">
                  <div className="modal-detail-item">
                    <span className="detail-label">Context &amp; Discipline</span>
                    <p className="detail-value">
                      {selectedGraphicItem.clientOrContext ||
                        selectedGraphicItem.category}
                    </p>
                  </div>

                  <div className="modal-detail-item">
                    <span className="detail-label">Design Breakdown</span>
                    <p className="detail-value detail-desc">
                      {selectedGraphicItem.description}
                    </p>
                  </div>

                  <div className="modal-detail-item">
                    <span className="detail-label">Design Tools &amp; Methods</span>
                    <div className="modal-tags">
                      {selectedGraphicItem.tags.map((tag) => (
                        <span key={tag} className="modal-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {filteredGraphicProjects.length > 1 && (
                    <div className="modal-counter-row">
                      <span className="modal-counter-text">
                        Artwork {currentGraphicIndex + 1} of{" "}
                        {filteredGraphicProjects.length}
                      </span>
                      <div className="modal-artwork-nav-btns">
                        <button
                          type="button"
                          className="modal-artwork-nav-btn"
                          onClick={handlePrevGraphicLightbox}
                          title="Previous artwork"
                          data-cursor="disable"
                        >
                          <MdChevronLeft />
                        </button>
                        <button
                          type="button"
                          className="modal-artwork-nav-btn"
                          onClick={handleNextGraphicLightbox}
                          title="Next artwork"
                          data-cursor="disable"
                        >
                          <MdChevronRight />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Work;
