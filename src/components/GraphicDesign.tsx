import { useState, useEffect, useCallback, useMemo } from "react";
import {
  graphicDesignProjects,
  graphicDesignCategories,
  GraphicDesignItem,
} from "../data/graphicDesignData";
import {
  MdClose,
  MdArrowBack,
  MdArrowForward,
  MdZoomIn,
  MdOutlinePalette,
} from "react-icons/md";
import "./styles/GraphicDesign.css";

const GraphicDesign = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GraphicDesignItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return graphicDesignProjects;
    }
    return graphicDesignProjects.filter(
      (item) => item.categorySlug === activeCategory
    );
  }, [activeCategory]);

  const currentIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return filteredProjects.findIndex((item) => item.id === selectedItem.id);
  }, [selectedItem, filteredProjects]);

  const handleNext = useCallback(() => {
    if (currentIndex === -1 || filteredProjects.length <= 1) return;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    setSelectedItem(filteredProjects[nextIdx]);
  }, [currentIndex, filteredProjects]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1 || filteredProjects.length <= 1) return;
    const prevIdx =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedItem(filteredProjects[prevIdx]);
  }, [currentIndex, filteredProjects]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  return (
    <section className="graphic-section" id="graphic-design">
      <div className="graphic-container section-container">
        {/* Section Header */}
        <div className="graphic-header">
          <div className="graphic-badge">
            <MdOutlinePalette className="badge-icon" />
            <span>Creative Showcase</span>
          </div>
          <h2 className="graphic-title">
            Graphic <span>Design</span>
          </h2>
          <p className="graphic-subtitle">
            Crafting visual identities, brand systems, and campaign creatives that complement intuitive digital experiences.
          </p>
          <div className="graphic-lead-pill">
            <span>Leadership &amp; Operations:</span> Graphic Design Lead for E-Cell &amp; CSBSSA
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="graphic-filters" role="tablist" aria-label="Graphic design categories">
          {graphicDesignCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.slug}
              className={`graphic-filter-btn ${
                activeCategory === category.slug ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.slug)}
              data-cursor="disable"
            >
              {category.label}
              {category.slug !== "all" && (
                <span className="filter-count">
                  {
                    graphicDesignProjects.filter(
                      (p) => p.categorySlug === category.slug
                    ).length
                  }
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Design Grid */}
        <div className="graphic-grid">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="graphic-card"
              onClick={() => setSelectedItem(project)}
              data-cursor="pointer"
              tabIndex={0}
              role="button"
              aria-label={`View ${project.title} design details`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedItem(project);
                }
              }}
            >
              <div className="graphic-card-media">
                <img
                  src={project.image}
                  alt={project.title}
                  loading={idx < 4 ? "eager" : "lazy"}
                  className="graphic-card-img"
                />
                <div className="graphic-card-overlay">
                  <div className="overlay-content">
                    <span className="overlay-zoom-icon">
                      <MdZoomIn />
                    </span>
                    <span className="overlay-text">Inspect Artwork</span>
                  </div>
                </div>
                <div className="graphic-card-cat-badge">
                  {project.category}
                </div>
              </div>

              <div className="graphic-card-info">
                <div className="graphic-card-header-row">
                  <h3 className="graphic-card-title">{project.title}</h3>
                </div>
                <p className="graphic-card-desc">{project.description}</p>
                <div className="graphic-card-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="graphic-tag">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="graphic-tag more-tag">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="graphic-modal-backdrop"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div
            className="graphic-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls */}
            <div className="modal-top-bar">
              <div className="modal-title-wrap">
                <span className="modal-category-badge">{selectedItem.category}</span>
                <h3 className="modal-title">{selectedItem.title}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                data-cursor="disable"
              >
                <MdClose />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-body">
              <div className="modal-image-stage">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="modal-image"
                />

                {/* Arrows if multiple items */}
                {filteredProjects.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="modal-arrow modal-arrow-prev"
                      onClick={handlePrev}
                      aria-label="Previous artwork"
                      data-cursor="disable"
                    >
                      <MdArrowBack />
                    </button>
                    <button
                      type="button"
                      className="modal-arrow modal-arrow-next"
                      onClick={handleNext}
                      aria-label="Next artwork"
                      data-cursor="disable"
                    >
                      <MdArrowForward />
                    </button>
                  </>
                )}
              </div>

              {/* Artwork Metadata Sidebar / Footer */}
              <div className="modal-details-pane">
                <div className="modal-detail-item">
                  <span className="detail-label">Context &amp; Discipline</span>
                  <p className="detail-value">
                    {selectedItem.clientOrContext || selectedItem.category}
                  </p>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Design Breakdown</span>
                  <p className="detail-value detail-desc">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Design Tools &amp; Methods</span>
                  <div className="modal-tags">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className="modal-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {filteredProjects.length > 1 && (
                  <div className="modal-counter">
                    Artwork {currentIndex + 1} of {filteredProjects.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GraphicDesign;
