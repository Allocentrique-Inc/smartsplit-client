import React from 'react';
import '../../assets/scss/assistant-form.scss';

export default class Page extends React.Component {
    render() {
        return (
            <div className={ 'ui container assistant-container ' + (this.props.pochette ? 'pochette' : '') }>
                <div className="ui grid">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
