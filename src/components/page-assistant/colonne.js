import React from 'react';
import '../../assets/scss/assistant-form.scss';

export default class Colonne extends React.Component {
    render() {
        return (
            <div
                className="form-column ui sixteen wide mobile eight wide tablet eight wide computer column"
            >
                { this.props.children }
            </div>
        );
    }
}
