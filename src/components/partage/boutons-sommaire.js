import React, { useState } from "react";
import "../../assets/scss/tableaudebord/tableaudebord.scss";
import { Translation } from "react-i18next";

export default function Boutons() {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <Translation>
      {t => (
        <div className="boutons-sommaire">
          <BoutonRefuser
            color="#ac1616"
            backgroundColor="white"
            active={selectedButton === "refuser"}
            handleClick={() => setSelectedButton("refuser")}
          />
          <BoutonAccepter
            color="#2da84f"
            active={selectedButton === "accepter"}
            handleClick={() => setSelectedButton("accepter")}
          />
        </div>
      )}
    </Translation>
  );
}

const { BoutonAccepter, BoutonRefuser } = props => {
  const { color, active, handleClick } = props;

  return (
    <>
      <button
        class="ui button medium accepte"
        onClick={handleClick}
        style={{
          background: active ? color : "#fff"
        }}
      ></button>
      <button
        class="ui button medium refus"
        onClick={handleClick}
        style={{
          background: active ? color : "#fff"
        }}
      ></button>
    </>
  );
};

/* 
export class BoutonRefus extends Component {
  constructor(props) {
    super(props);
    this.state.button = true;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      button: !this.state.button
    });
  }
  render() {
    return (
      <>
        <div
          className={
            this.state.button
              ? "ui button medium refus true"
              : "ui button medium refus false"
          }
          onClick={this.handleClick}
        ></div>
      </>
    );
  }
}

export class BoutonAccepte extends Component {
  constructor(props) {
    super(props);
    this.state.button = true;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      button: !this.state.button
    });
  }
  render() {
    return (
      <>
        <div
          className={
            this.state.button
              ? "ui button medium accepte true"
              : "ui button medium accepte false"
          }
          onClick={this.handleClick}
        ></div>
      </>
    );
  }
} */
