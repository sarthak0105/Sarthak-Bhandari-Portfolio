import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/sarthak-bhandari-17ba2528b"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — Sarthak Bhandari
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.Tech — Computer Science and Business Systems, Kolhapur Institute of Technology's College of Engineering — 2023–2027
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="mailto:sarthakbhandarisb0105@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href="https://github.com/sarthak0105"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/sarthak-bhandari-17ba2528b"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
        </div>
        <div className="contact-footer">
          <h2>
            Designed and Developed <br /> by <span>Sarthak Bhandari</span>
          </h2>
          <h5>
            <MdCopyright /> 2026
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
