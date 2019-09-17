import React from 'react';
import TitreModifiable from "./titre-modifiable";
import Rangee from "./rangee";

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
            <>
                <TitreModifiable href={ '#' }>
                    <h3 className={ 'corps-title-1' }>Création</h3>
                </TitreModifiable>

                <table className={ 'corps-table' }>
                    { this.rows.map(row => Rangee(row)) }
                </table>
            </>
        )
    }
}
