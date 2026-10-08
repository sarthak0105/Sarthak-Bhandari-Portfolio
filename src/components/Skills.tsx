import { useEffect, useRef } from "react";
import "./styles/Skills.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    label: "UI/UX",
    featured: true,
    skills: [
      "Figma",
      "Framer",
      "Lovable",
      "Adobe XD",
      "Wireframing",
      "Prototyping",
      "User Flows",
      "Information Architecture",
    ],
  },
  {
    label: "Graphic Design",
    featured: true,
    skills: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe After Effects",
      "Canva",
    ],
  },
  {
    label: "Design",
    featured: true,
    skills: [
      "Visual Hierarchy",
      "Responsive Design",
      "Design Systems",
      "Interaction Design",
      "Usability",
      "User-Centered Design",
    ],
  },
  {
    label: "Frontend",
    featured: false,
    skills: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Programming",
    featured: false,
    skills: ["HTML5", "CSS3", "JavaScript", "Python"],
  },
  {
    label: "Backend",
    featured: false,
    skills: ["Node.js", "REST APIs"],
  },
];

const Skills = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let isVisible = false;

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,234,212,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            animId = requestAnimationFrame(draw);
          }
        } else {
          isVisible = false;
          cancelAnimationFrame(animId);
        }
      },
      { rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 3D tilt on rows via mouse
  useEffect(() => {
    const rows = rowRefs.current;
    const handlers: { el: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];

    rows.forEach((row) => {
      if (!row) return;
      const onMove = (e: MouseEvent) => {
        const rect = row.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        row.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
      };
      const onLeave = () => {
        row.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      };
      row.addEventListener("mousemove", onMove);
      row.addEventListener("mouseleave", onLeave);
      handlers.push({ el: row, move: onMove, leave: onLeave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  // Scroll stagger reveal — desktop only
  useEffect(() => {
    if (window.innerWidth < 768) return;
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play pause resume reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="skills-section section-container" id="skills" ref={sectionRef}>
      <canvas className="skills-canvas" ref={canvasRef} />
      <div className="skills-header">
        <h2 className="skills-title">
          My <span>Skills</span>
        </h2>
      </div>
      <div className="skills-grid">
        {skillCategories.map((cat, i) => (
          <div
            className={`skills-row ${cat.featured ? "skills-row-featured" : "skills-row-secondary"}`}
            key={cat.label}
            ref={(el) => (rowRefs.current[i] = el)}
          >
            <span className="skills-category">
              {cat.label}
              {cat.featured && <span className="skills-featured-badge">Core</span>}
            </span>
            <div className="skills-tags">
              {cat.skills.map((skill) => (
                <div
                  className={`skill-flip ${cat.featured ? "skill-flip-featured" : ""}`}
                  key={skill}
                >
                  <div className="skill-flip-inner">
                    <div className="skill-flip-front">{skill}</div>
                    <div className="skill-flip-back">{skill}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
