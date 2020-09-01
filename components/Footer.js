import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTwitter from "@fortawesome/fontawesome-free-brands/faTwitter";
import faInstagram from "@fortawesome/fontawesome-free-brands/faInstagram";
import faGithub from "@fortawesome/fontawesome-free-brands/faGithub";

const Footer = (props) => (
  <footer id="footer" style={props.timeout ? { display: "none" } : {}}>
    <ul className="icons">
      <li>
        <a href="https://twitter.com/epick362" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/epick362/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </li>
      <li>
        <a href="https://github.com/Epick362" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </li>
    </ul>
  </footer>
);

Footer.propTypes = {
  timeout: PropTypes.bool,
};

export default Footer;
