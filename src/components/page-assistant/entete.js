import React from 'react';
import '../../assets/scss/page-assistant/entete.scss';

export default class Entete extends React.Component {

    labelClasses() {
        return 'label' + (this.props.pochette ? ' pochette' : '');
    }

    render() {
        return (
            <header className="entete-assistant">
                <h1 className="title">
                    <span className="icon">
                        <img src={ this.props.icon } alt={ this.props.label }/>
                    </span>

                    <span className={ this.labelClasses() }>
                        { this.props.label }
                    </span>
                </h1>

                <h2 className="question" dangerouslySetInnerHTML={ { __html: this.props.question } }/>

                <p className="description">
                    { this.props.description }
                </p>
            </header>
        );
    }
}
