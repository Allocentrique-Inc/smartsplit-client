import React from 'react';
import TableGauche from "./table-gauche";

export default class TableEnregistrement extends React.Component {
    rows = [
        {
            label: 'Date d\'enregistrement',
            value: ''
        },

        {
            label: 'Date de sortie',
            value: 'À venir'
        },

        {
            label: 'Titre de la piste',
            value: 'Love you baby'
        },

        {
            label: 'ISRC',
            helpIcon: true,
            value: 'CAA509711403'
        },

        {
            label: 'Réalisateur',
            value: (<span>Carl Bastien</span>)
        },

        {
            label: 'Techniciens en enregistrement',
            value: (<><span>Claude Bernard</span>, <span>Sébastien Longchamps</span></>)
        },

        {
            label: 'Mixage',
            value: (<><span>Sylvain Médrion</span></>)
        },

        {
            label: 'Mastering',
            value: (<><span>Ryebread Mastering</span></>)
        },

        {
            label: 'Production',
            value: (<><span>Paul Leinette</span>, <span>Steve Roquefort</span>, <span>Joanie Flan</span></>)
        },

        {
            label: 'Étiquette',
            value: ''
        },

        {
            label: 'Studio d\'enregistrement',
            value: (<>Studio Piccolo<br/><span class={'color-secondary'}>1234 rue du Rock, Montréal (QC) H2J 2K9</span></>)
        },
    ];

    render() {
        return (
            <TableGauche
                title={ 'Enregistrement sonore' }
                rows={ this.rows }
            />
        )
    }
}
