import React from "react";
import "../../assets/scss/page-assistant/input-fichier.scss";
import { withTranslation } from "react-i18next";

class InputFichier extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    const filename = this.props.value ? this.props.value.name : "";
    this.state = {
      filename: filename
    }
  }

  placeholder() {
    const t = this.props.t
    return (      
          this.state.filename ||
          this.props.placeholder ||
          t("flot.split.documente-ton-oeuvre.documenter.glisse")      
    )
  }

  clickFileInput = event => {
    event.preventDefault()
    this.fileInputRef.current.click()
  }

  handleFileInputChange = event => {

    this.props.onChange(event.target.files[0])

    if(this.props.conserverNomFichier) {
      const filename = event.target.files.length
      ? event.target.files[0].name
      : ""
      this.setState({
        filename: filename
      })
    }
    
  }  

  render() {
    const t = this.props.t
    return (    
      <div
        className="file-input-container"            
      >
        <div className="ui button" onClick={this.clickFileInput}>
          {t("flot.split.documente-ton-oeuvre.documenter.choix")}
        </div>
        <div className="placeholder cliquable">{this.placeholder()}</div>
        <input
          ref={this.fileInputRef}
          className="hidden"
          type="file"
          onChange={this.handleFileInputChange}
        />
      </div>
    )
  }
}
export default withTranslation()(InputFichier)