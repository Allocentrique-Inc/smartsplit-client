import React from 'react';
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";
import { TextArea } from "semantic-ui-react";

export default class ChampTextArea extends React.Component {
    undertext() {
        return this.props.undertext ?
            (<p className="undertext">{ this.props.undertext }</p>) :
            (<></>);
    }

    render() {
        return (
            <div className="champ">
                <label>
                    <TitreChamp
                        label={ this.props.label }
                        description={ this.props.description }
                    />

                    <textarea
                        placeholder={ this.props.placeholder }
                        onChange={ event => this.props.onChange ? this.props.onChange(event.target.value) : null }
                        rows={ this.props.rows || 8 }
                    />

                    { this.undertext() }
                </label>
            </div>
        );
    }
}
