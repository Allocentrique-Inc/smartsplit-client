import React from 'react';
import TableDroite from "./table-droite";

export default class TableInformationsGenerales extends React.Component {
    rows = [
        {
            label: 'Durée',
            value: '3:12'
        },
        {
            label: 'BPM',
            value: '136'
        },
        {
            label: 'Genre',
            value: 'Rock'
        },
        {
            label: 'Styles',
            value: 'Rockabilly, Dubtrap, British Rock, Black Metal'
        },
        {
            label: 'Influences',
            value: 'The Rolling Stones, Ivy and the Pearls, Frankie and the Lights, Kanye West, Apollo Brown'
        },
    ];

    render() {
        return (
            <TableDroite
                title={ 'Information générales' }
                rows={ this.rows }
            />
        );
    }
}
