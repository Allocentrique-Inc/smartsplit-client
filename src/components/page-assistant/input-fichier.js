import React from "react";
import "../../assets/scss/page-assistant/input-fichier.scss";
import { Translation } from "react-i18next";

export default class InputFichier extends React.Component {
  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();

    const filename = this.props.value ? this.props.value.name : "";

    this.state = {
      filename: filename
    };
  }

  placeholder() {
    return (
      <Translation>
        {t =>
          this.state.filename ||
          this.props.placeholder ||
          t("flot.split.documente-ton-oeuvre.documenter.glisse")
        }
      </Translation>
    );
  }

  clickFileInput = event => {
    event.preventDefault();
    this.fileInputRef.current.click();
  };

  handleFileInputChange = event => {
    const filename = event.target.files.length
      ? event.target.files[0].name
      : "";

    this.props.onChange(event.target.files[0]);

    this.setState({
      filename: filename
    });
  };

  render() {
    return (
      <Translation>
        {t => (
          <div
            className="file-input-container"
            style={{
              width: "100%",
              display: "inline-flex"
            }}
          >
            <div className="ui button" onClick={this.clickFileInput}>
              {t("flot.split.documente-ton-oeuvre.documenter.choix")}
            </div>

            <div className="placeholder">{this.placeholder()}</div>

            <input
              ref={this.fileInputRef}
              className="hidden"
              type="file"
              onChange={this.handleFileInputChange}
            />
          </div>
        )}
      </Translation>
    );
  }
}
