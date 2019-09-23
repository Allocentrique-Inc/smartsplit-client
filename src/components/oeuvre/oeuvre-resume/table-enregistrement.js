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
            value: (<a href={'#'}>Carl Bastien</a>)
        },

        {
            label: 'Techniciens en enregistrement',
            value: (<><a href={'#'}>Claude Bernard</a>, <a href={'#'}>Sébastien Longchamps</a></>)
        },

        {
            label: 'Mixage',
            value: (<><a href={'#'}>Sylvain Médrion</a></>)
        },

        {
            label: 'Mastering',
            value: (<><a href={'#'}>Ryebread Mastering</a></>)
        },

        {
            label: 'Production',
            value: (<><a href={'#'}>Paul Leinette</a>, <a href={'#'}>Steve Roquefort</a>, <a href={'#'}>Joanie Flan</a></>)
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
