import React from 'react';
import TitreChamp from "./titre-champ";
import "../../assets/scss/page-assistant/champ.scss"
import InputFichier from "./input-fichier";

export default class ChampFichier extends React.Component {
    render() {
        return (
            <div className="champ-fichier">
                <label>
                    <TitreChamp
                        label={ this.props.label }
                        description={ this.props.description }
                    />

                    <InputFichier
                        value={ this.props.value }
                        onChange={ value => this.props.onChange(value) }
                    />

                    <p className="undertext">{ this.props.undertext }</p>
                </label>
            </div>
        );
    }
}
