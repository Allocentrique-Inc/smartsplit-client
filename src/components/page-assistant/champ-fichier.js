import React from 'react';
import TitreChamp from "./titre-champ";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
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

                    <InputFichier/>

                    <p className="undertext">{ this.props.undertext }</p>
                </label>
            </div>
        );
    }
}
