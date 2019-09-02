import React from 'react';
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import '../../assets/scss/page-assistant/champ.scss';

export default class ChampTexte extends React.Component {
    render() {
        return (
            <div className="champ">
                <label>
                    <div className="input-title">
                        <div className="input-label">{ this.props.label }</div>

                        <p className="input-description">
                            { this.props.description }
                        </p>
                    </div>

                    <Input
                        fluid
                        placeholder={ this.props.placeholder }
                        onChange={ this.props.onChange }
                    />
                </label>
            </div>
        );
    }
}
