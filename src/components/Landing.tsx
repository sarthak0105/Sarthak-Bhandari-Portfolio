import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SARTHAK
              <br />
              <span>BHANDARI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">UI/UX</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Designer</div>
            </h2>
            <p className="landing-tagline">
              UI/UX Designer crafting intuitive digital experiences and visually compelling designs.
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
