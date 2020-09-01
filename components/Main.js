import PropTypes from "prop-types";
import axios from "axios";

class Main extends React.Component {
  state = {
    contactForm: {
      name: "",
      email: "",
      message: "",
    },
  };

  submitContact(e) {
    e.preventDefault();
    axios
      .post("https://formcarry.com/s/Xyx7m6AFIBSo", this.state.contactForm, {
        headers: { Accept: "application/json" },
      })
      .then(({ data }) => {
        alert("Ďakujem, ozvem sa Vám čo najskôr.");
      });
  }

  render() {
    const close = (
      <div
        className="close"
        onClick={() => {
          this.props.onCloseArticle();
        }}
      ></div>
    );

    const getAge = (birthDate) =>
      Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

    return (
      <div
        id="main"
        style={this.props.timeout ? { display: "flex" } : { display: "none" }}
      >
        <article
          id="intro"
          className={`${this.props.article === "intro" ? "active" : ""} ${
            this.props.articleTimeout ? "timeout" : ""
          }`}
          style={{ display: "none" }}
        >
          <h2 className="major">O mne</h2>
          <span className="image main">
            <img src="/static/images/about.jpg" alt="" />
          </span>
          <p>
            Narodil som sa v Bratislave a mám {getAge("1995-11-09")} rokov.
            Odmalička ma baví práca s počítačmi, či uz ide o grafiku, hranie sa
            alebo programovanie. Neprogramujem však 24/7 a okrem iného sa
            venujem cvičeniu kalisteniky, športom ako lyžovanie, lezenie,
            splavovanie. Rád si zresetujem hlavu pobytom v prírode či uz na
            prechádzke alebo vysokohorskej turistike. Hudba je velká čast môjho
            života, chodievam na rôzne koncerty a festivaly (Grape, Beats4Love).
            Hrávam League of Legends a občas aj iné hry. Mám kocúra Felixa,
            ktorý mi robí doma neustále neporiadok (áno, za všetok neporiadok u
            mna môže len on).
          </p>
          {close}
        </article>

        <article
          id="work"
          className={`${this.props.article === "work" ? "active" : ""} ${
            this.props.articleTimeout ? "timeout" : ""
          }`}
          style={{ display: "none" }}
        >
          <h2 className="major">Práca</h2>
          <span className="image main">
            <img src="/static/images/work.jpg" alt="" />
          </span>

          <p>
            O webové technológie sa zaujímam odmalička. Svoju prvú stránku som
            vytvoril keď som mal okolo 14 a odvtedy som neprestal tvoriť. Začal
            som s PHP a postupne prešiel na vývoj v Javascripte. Prvé webové
            aplikácie som robil v AngularJS ale teraz robím skoro výhradne s
            React v Typescripte. Študoval som Aplikovanú Informatiku na
            Masarykovej Univerzite v Brne a teraz pracujem vo firme eDocu.
            Vyvíjam tu Front End aplikácie, React Native mobilné aplikácie a
            pracujem s AWS službami ako AWS Lambda na budovanie Back End služieb
            ku GIS systémom.
          </p>

          <p>
            Zaujímam sa aj o blockchain technológie, hlavne okolo siete Ethereum
            ($ETH). Smart kontrakty bežiace na tejto sieti otvárajú brány novým
            možnostiam v oblasti decentralizovaných financíí (takzvané DeFi) ako
            sú napríklad anonymné, otvorené a cenzúre odolné burzy bez
            sprostredkovateľov.
          </p>
          {close}
        </article>

        <article
          id="contact"
          className={`${this.props.article === "contact" ? "active" : ""} ${
            this.props.articleTimeout ? "timeout" : ""
          }`}
          style={{ display: "none" }}
        >
          <h2 className="major">Kontakt</h2>
          <form onSubmit={(e) => this.submitContact(e)}>
            <div className="field half first">
              <label htmlFor="name">Vaše meno</label>
              <input
                type="text"
                name="name"
                onChange={(event) =>
                  this.setState({ contactForm: { name: event.target.value } })
                }
                value={this.state.contactForm.name}
                id="name"
              />
            </div>
            <div className="field half">
              <label htmlFor="email">Váš email</label>
              <input
                type="text"
                name="email"
                onChange={(event) =>
                  this.setState({ contactForm: { email: event.target.value } })
                }
                value={this.state.contactForm.email}
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="message">Správa</label>
              <textarea
                name="message"
                onChange={(event) =>
                  this.setState({
                    contactForm: { message: event.target.value },
                  })
                }
                value={this.state.contactForm.message}
                id="message"
                rows="4"
              ></textarea>
            </div>
            <ul className="actions">
              <li>
                <input type="submit" value="Send Message" className="special" />
              </li>
              <li>
                <input
                  type="reset"
                  value="Reset"
                  onClick={() =>
                    this.setState({
                      contactForm: { name: "", email: "", message: "" },
                    })
                  }
                />
              </li>
            </ul>
          </form>
          {close}
        </article>
      </div>
    );
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
};

export default Main;
