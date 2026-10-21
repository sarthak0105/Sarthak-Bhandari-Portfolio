export interface GraphicDesignItem {
  id: string;
  title: string;
  category: string;
  categorySlug: "posters" | "carousels" | "product-posts";
  description: string;
  image: string;
  galleryImages?: string[];
  tags: string[];
  clientOrContext?: string;
  featured?: boolean;
}

export const graphicDesignCategories = [
  { label: "All Designs", slug: "all" },
  { label: "Posters & Events", slug: "posters" },
  { label: "Educational Carousels", slug: "carousels" },
  { label: "Product & Social", slug: "product-posts" },
] as const;

export const graphicDesignProjects: GraphicDesignItem[] = [
  {
    id: "illuminate-summit-poster",
    title: "Illuminate — Flagship Innovation Summit",
    category: "Posters & Events",
    categorySlug: "posters",
    description:
      "Grand-scale typographic and visual campaign poster for 'Illuminate', featuring dynamic geometric illumination, atmospheric gradients, and structured event schedule hierarchy.",
    image: "/images/graphic-design/Graphics/Illuminate poster.png",
    tags: ["Event Branding", "Poster Design", "Typography", "Figma"],
    clientOrContext: "E-Cell Flagship Summit",
    featured: true,
  },
  {
    id: "csbssa-main-poster",
    title: "CSBSSA Annual Grand Event Poster",
    category: "Posters & Events",
    categorySlug: "posters",
    description:
      "Official high-impact large-format poster for the annual CSBSSA student festival, orchestrating dynamic chromatic typography, sponsor billing, and celebratory festival aesthetics.",
    image: "/images/graphic-design/Graphics/Main Poster.png",
    tags: ["Festival Poster", "Creative Direction", "Typography", "Visual Hierarchy"],
    clientOrContext: "CSBSSA Annual Festival",
    featured: true,
  },
  {
    id: "fortune-academy-campaign",
    title: "Fortune Academy Brand & Growth Campaign",
    category: "Posters & Events",
    categorySlug: "posters",
    description:
      "Comprehensive educational marketing banner and brand campaign layout highlighting academy courses, competitive mentorship programs, and institutional credibility.",
    image: "/images/graphic-design/Graphics/Fortune Acadamy.png",
    tags: ["Education Branding", "Banner Design", "Marketing Creative", "Figma"],
    clientOrContext: "Fortune Academy Branding",
    featured: true,
  },
  {
    id: "notebooklm-ai-carousel",
    title: "Google NotebookLM AI Breakdown",
    category: "Educational Carousels",
    categorySlug: "carousels",
    description:
      "Seamless panoramic multi-slide LinkedIn educational carousel explaining NotebookLM's source-grounded intelligence, audio overview generation, and research workflows.",
    image: "/images/graphic-design/Carousel/Notebooklm.png",
    tags: ["Carousel Design", "AI Tooling", "Visual Storytelling", "Social Media"],
    clientOrContext: "LinkedIn Tech Breakdown",
    featured: true,
  },
  {
    id: "github-developer-carousel",
    title: "GitHub Developer Guide & Workflows",
    category: "Educational Carousels",
    categorySlug: "carousels",
    description:
      "Comprehensive tech carousel guide detailing GitHub version control essentials, branching strategies, automated actions, and open-source collaboration.",
    image: "/images/graphic-design/Carousel/Github Info.png",
    tags: ["Developer Guide", "Infographic", "Carousel Series", "Figma"],
    clientOrContext: "Developer Community Guide",
    featured: true,
  },
  {
    id: "napkin-ai-carousel",
    title: "Napkin AI: Text-to-Diagram Breakdown",
    category: "Educational Carousels",
    categorySlug: "carousels",
    description:
      "Panoramic educational carousel demonstrating how Napkin AI transforms unstructured text into clear visual diagrams, flowcharts, and presentation assets.",
    image: "/images/graphic-design/Carousel/napkin ai.png",
    tags: ["Visual Storytelling", "Diagrams", "AI Content", "LinkedIn Carousel"],
    clientOrContext: "LinkedIn Tech Series",
    featured: true,
  },
  {
    id: "product-launch-series",
    title: "Modular Product Launch Social Series",
    category: "Product & Social",
    categorySlug: "product-posts",
    description:
      "5-slide cohesive Instagram & LinkedIn product campaign detailing feature benefits, visual onboarding steps, and user conversion call-to-actions.",
    image: "/images/graphic-design/Product Post/slide 1.png",
    galleryImages: [
      "/images/graphic-design/Product Post/slide 1.png",
      "/images/graphic-design/Product Post/slide 2.png",
      "/images/graphic-design/Product Post/slide 3.png",
      "/images/graphic-design/Product Post/slide 4.png",
      "/images/graphic-design/Product Post/slide 5.png",
    ],
    tags: ["Social Media", "Product Marketing", "5-Slide Carousel", "Figma"],
    clientOrContext: "Product Marketing Campaign",
    featured: true,
  },
];
