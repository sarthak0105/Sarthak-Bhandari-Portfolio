import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    const cleanups: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      const defaultX = rect.width / 2;
      const defaultY = rect.height / 2;
      let mouseX = defaultX;
      let mouseY = defaultY;
      let currentX = defaultX;
      let currentY = defaultY;
      let isAnimating = false;
      let rafId: number;

      const updatePosition = () => {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        currentX += dx * 0.15;
        currentY += dy * 0.15;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          rafId = requestAnimationFrame(updatePosition);
        } else {
          isAnimating = false;
        }
      };

      const startAnimation = () => {
        if (!isAnimating) {
          isAnimating = true;
          rafId = requestAnimationFrame(updatePosition);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = defaultX;
          mouseY = defaultY;
        }
        startAnimation();
      };

      document.addEventListener("mousemove", onMouseMove, { passive: true });
      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/sarthak0105"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/sarthak-bhandari-17ba2528b"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/sarthak_bhandari_Resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
