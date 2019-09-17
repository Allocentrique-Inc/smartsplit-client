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
