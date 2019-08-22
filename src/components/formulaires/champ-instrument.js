import React, { Component } from 'react';
import { ItemSelectionne } from "./item-selectionne";

export class ChampInstrument extends Component {
    render() {
        return (
            <>
                <ItemSelectionne
                    key={ this.props.item.key }
                    image={ this.props.item.image.src }
                    nom={ this.props.item.text }
                    onClick={ this.props.onClick }
                />

                <div className="instrument-form">
                    <p>Quel type d'interprétation ?</p>

                    <p>Quel rôle dans la pièce musicale ?</p>
                </div>
            </>
        );
    }
}
