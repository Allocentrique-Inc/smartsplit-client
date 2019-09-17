import React from 'react';
import TableGauche from "./table-gauche";

export default class TableCreation extends React.Component {
    rows = [
        {
            label: 'Date de création',
            value: '8 juillet 2019'
        },
        {
            label: 'ISWC',
            helpIcon: true,
            value: '',
        },
        {
            label: 'Auteurs (paroles)',
            value: (
                <>
                    <a href="#">Inscience</a>, <a href="#">Lores</a>, <a href="#">Quest Love</a>, <a href="#">Jean-Pierre
                    Cool</a>
                </>
            )
        },
        {
            label: 'Compositeurs (musique)',
            value: (
                <>
                    <a href="#">Inscience</a>, <a href="#">Lores</a>, <a href="#">Quest Love</a>, <a href="#">Jean-Pierre
                    Cool</a>
                </>
            )
        },
        {
            label: 'Arrangeurs (musique)',
            value: (
                <>
                    <a href="#">Inscience</a>, <a href="#">Lores</a>, <a href="#">Quest Love</a>, <a href="#">Jean-Pierre
                    Cool</a>
                </>
            )
        },
        {
            label: 'Éditeurs',
            value: (
                <>
                    <a href="#">Sync.mu</a>, <a href="#">Lepdup</a>
                </>
            )
        },
    ];

    render() {
        return (
            <TableGauche
                title={ 'Création' }
                rows={ this.rows }
            />
        )
    }
}
