import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faGem from "@fortawesome/fontawesome-free-regular/faGem";

const Header = (props) => (
  <header id="header" style={props.timeout ? { display: "none" } : {}}>
    <img className="logo" src="/static/images/profile_picture.jpg" alt="" />
    <div className="content">
      <div className="inner">
        <h1>Filip Hájek</h1>
        <p>
          Pracujem ako programátor 👨🏻‍💻 v{" "}
          <a href="https://www.edocu.com/" target="_blank">
            eDocu
          </a>
          .
        </p>
        <p>
          Vo voľnom čase chodím do prírody 🏕,
          <br /> na festivaly 🔊, cestujem 🌍 a hrám 🎮.
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <a
            href="javascript:;"
            onClick={() => {
              props.onOpenArticle("intro");
            }}
          >
            O mne
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            onClick={() => {
              props.onOpenArticle("work");
            }}
          >
            Práca
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            onClick={() => {
              props.onOpenArticle("contact");
            }}
          >
            Kontakt
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
};

export default Header;
