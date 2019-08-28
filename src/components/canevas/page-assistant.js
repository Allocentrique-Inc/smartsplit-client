import React from 'react';
import '../../assets/scss/assistant-form.scss';

export class PageAssistant extends React.Component {
    render() {
        return (
            <div className={ 'ui container assistant-container ' + (this.props.pochette ? 'pochette' : '') }>
                <div className="ui grid">
                    <div
                        className="form-column ui sixteen wide mobile eight wide tablet eight wide computer column"
                    >
                        <header className="section-header">
                            <h1 className="section-title">
                                            <span className="section-icon">
                                                <img src={ this.props.sectionIcon } alt={ this.props.sectionLabel }/>
                                            </span>

                                <span className="section-label">
                                                { this.props.sectionLabel }
                                            </span>
                            </h1>

                            <h2 className="section-question">
                                { this.props.sectionQuestion }
                            </h2>

                            <p className="section-description">
                                { this.props.sectionDescription }
                            </p>
                        </header>

                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}
