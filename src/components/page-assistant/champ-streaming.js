import React from 'react';
import '../../assets/scss/page-assistant/champ-streaming.scss';
import Input from "semantic-ui-react/dist/commonjs/elements/Input";

export default class ChampStreaming extends React.Component {
    render() {
        return (
            <div className="streaming-field">
                <img src={ this.props.icon } alt={ this.props.label }/>

                <div className="label">{ this.props.label }</div>

                <Input
                    fluid
                    placeholder={ this.props.placeholder }
                    value={ this.props.value }
                    onChange={ (event, { value }) => this.props.onChange(value) }
                />
            </div>
        );
    }
}
