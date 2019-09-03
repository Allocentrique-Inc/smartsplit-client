import React from 'react';
import '../../assets/scss/page-assistant/input-fichier.scss';

export default class InputFichier extends React.Component {

    constructor(props) {
        super(props);

        this.fileInputRef = React.createRef();

        this.state = {
            filename: ''
        }
    }

    placeholder() {
        return this.state.filename || this.props.placeholder || 'ou glissez votre fichier ici';
    }

    clickFileInput = event => {
        event.preventDefault();
        this.fileInputRef.current.click();
    };

    handleFileInputChange = event => {
        const filename = event.target.files.length ?
            event.target.files[0].name :
            '';

        this.setState({
            filename: filename
        });
    };

    render() {
        return (
            <div className="file-input-container">
                <div className="ui button"
                    onClick={ this.clickFileInput }
                >
                    Choisir un fichier
                </div>

                <div className="placeholder">
                    { this.placeholder() }
                </div>

                <input ref={ this.fileInputRef }
                       className="hidden"
                       type="file"
                       onChange={ this.handleFileInputChange }
                />
            </div>
        );
    }
}
