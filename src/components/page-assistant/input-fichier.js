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
    event.preventDefault()
    this.fileInputRef.current.click()
  }

  handleFileInputChange = event => {
    this.props.onChange(event.target.files[0])
  }  

  render() {

    let surDeposer = ev=>{
      // Depuis https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
      console.log('File(s) dropped');
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
      }
    }

    return (
      <Translation>
        {t => (
          <div
            className="file-input-container"
            ondrop={(evt)=>surDeposer(evt)}
            ondragover={(evt)=>{evt.preventDefault()}}
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
        )}
      </Translation>
    );
  }
}
