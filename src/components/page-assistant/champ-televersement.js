import React from 'react';
import ChampFichier from "./champ-fichier";
import ChampAcces from "./champ-acces";

export default class ChampTeleversement extends React.Component {
    render() {
        return (
            <div className="section-televersement">
                <ChampFichier
                    label={ this.props.label }
                    undertext={ this.props.undertext }
                />
                <ChampAcces/>
            </div>
        );
    }
}
