import React, { Component } from 'react';
import { ItemSelectionne } from './item-selectionne';
import { Checkbox } from "semantic-ui-react";
import { instruments } from '../../assets/listes/fr/instruments';
import ChampSelectionMultiple from "./champ-selection-multiple";
import { Translation } from 'react-i18next'

export class FormulaireMusicien extends Component {

    constructor(props) {
        super(props);

        this.instrumentOptions = instruments
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
            .map(instrument => ({
                key: instrument.nom,
                value: instrument.nom,
                text: instrument.nom
            }));

        this.state = {
            type: "",
            chanteur: false,
            musicien: false,
            instruments: []
        };
    }

    handleTypeChange = event => this.setState({ type: event.target.value });
    handleRoleChange = (name, checked) => this.setState({ [name]: checked });

    instrumentSelect() {
        return this.state.musicien ?
            (
                <ChampSelectionMultiple
                    pochette={ this.props.pochette }
                    items={ this.instrumentOptions }
                    placeholder="Ajouter un instrument..."
                    value={ this.state.instruments }
                    onChange={ ids => this.setState({ instruments: ids }) }
                />
            ) :
            (<></>);
    }


    render() {
        return (
        <Translation>
            {
                (t) =>
            <>
                <ItemSelectionne
                    key={ this.props.item.key }
                    image={ this.props.item.image.src }
                    nom={ this.props.item.text }
                    onClick={ this.props.onClick }
                />

                <div className="instrument-form">
                    <p className="input-label">{t('flot.documenter.options.question1')}</p>

                    <div>
                        <div className="ui radio checkbox">
                            <input type="radio"
                                   name="type"
                                   value='principal'
                                   checked={ this.state.type === 'principal' }
                                   onChange={ event => this.handleTypeChange(event) }
                            />

                            <label>{t('flot.documenter.options.question1-choix-a')}</label>
                        </div>
                    </div>

                    <div>
                        <div className="ui radio checkbox">
                            <input type="radio"
                                   name="type"
                                   value='accompagnateur'
                                   checked={ this.state.type === 'accompagnateur' }
                                   onChange={ event => this.handleTypeChange(event) }
                            />

                            <label>{t('flot.documenter.options.question1-choix-b')}</label>
                        </div>
                    </div>

                    <p className="input-label">{t('flot.documenter.options.question2')}</p>

                    <div>
                        <Checkbox
                            label={ t('flot.documenter.options.question2-choix-a') }
                            checked={ this.state.chanteur }
                            onChange={ (event, { checked }) => this.handleRoleChange('chanteur', checked) }
                        />
                    </div>

                    <div>
                        <Checkbox
                            label={ t('flot.documenter.options.question2-choix-b') }
                            checked={ this.state.musicien }
                            onChange={ (event, { checked }) => this.handleRoleChange('musicien', checked) }
                        />
                    </div>

                    <div className="instrument-select">
                        { this.instrumentSelect() }
                    </div>
                </div>

                <div className="instrument-divider"></div>
            </>
            }
            </Translation>  
        );
    }
}
