import { useState } from "react";
import { MdZoomIn, MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  hasDesigns?: boolean;
  onOpenDesigns?: () => void;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (props.hasDesigns && props.onOpenDesigns) {
      e.preventDefault();
      props.onOpenDesigns();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && props.hasDesigns && props.onOpenDesigns) {
      e.preventDefault();
      props.onOpenDesigns();
    }
  };

  return (
    <div className="work-image">
      {props.hasDesigns ? (
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          data-cursor={"disable"}
          aria-label={`View ${props.alt || "project"} design mockups`}
        >
          <div className="work-link work-link-designs" title="View UI/UX Designs">
            <MdZoomIn />
            <span className="work-link-text">View Designs</span>
          </div>
          <img src={props.image} alt={props.alt} />
          {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
        </div>
      ) : (
        <a
          className="work-image-in"
          href={props.link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target="_blank"
          rel="noreferrer"
          data-cursor={"disable"}
        >
          {props.link && (
            <div className="work-link">
              <MdArrowOutward />
            </div>
          )}
          <img src={props.image} alt={props.alt} />
          {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
        </a>
      )}
    </div>
  );
};

export default WorkImage;
