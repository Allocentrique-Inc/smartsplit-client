import React from 'react';
import TableGauche from "./table-gauche";

export default class TableInterpretation extends React.Component {
    rows = [
        {
            label: (<a href="#">Inscience</a>),
            value: (
                <>
                    <div className={ 'mb-05' }>
                        <span className={ 'tag' }>Artiste vedette</span>
                    </div>

                    <div className={ 'flex mb-05' }>
                        <div>Musicien :&nbsp;</div>
                        <div className={ 'color-secondary' }>Samples</div>
                    </div>
                </>
            )
        },

        {
            label: (<a href="#">Quest Love</a>),
            value: (
                <>
                    <div className={ 'mb-05' }>
                        <span className={ 'tag' }>Artiste vedette</span>
                    </div>

                    <div className={ 'flex' }>
                        <div>Chanteur&nbsp;:&nbsp;</div>
                        <div className={ 'color-secondary' }>Soliste</div>
                    </div>

                    <div className={ 'flex' }>
                        <div>Musicien&nbsp;:&nbsp;</div>
                        <div className={ 'color-secondary' }>Guitare électrique, flûte à bec, basse électrique</div>
                    </div>
                </>
            )
        },

        {
            label: (<a href="#">Benny Williams</a>),
            value: (
                <>
                    <div className={ 'mb-05' }>
                        <span className={ 'tag' }>Artiste vedette</span>
                    </div>

                    <div className={ 'flex' }>
                        <div>Chanteur&nbsp;:&nbsp;</div>
                        <div className={ 'color-secondary' }>Soliste</div>
                    </div>

                    <div className={ 'flex' }>
                        <div>Musicien&nbsp;:&nbsp;</div>
                        <div className={ 'color-secondary' }>Guitare électrique, flûte à bec, basse électrique</div>
                    </div>
                </>
            )
        },
    ];

    render() {
        return (
            <TableGauche
                title={ 'Interprétation' }
                rows={ this.rows }
            />
        )
    }
}
