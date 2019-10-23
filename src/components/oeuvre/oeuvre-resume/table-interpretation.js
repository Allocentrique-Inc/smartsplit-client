import React from 'react';
import TableGauche from "./table-gauche";

export default class TableInterpretation extends React.Component {
    rows = [
        {
            label: (<span>Inscience</span>),
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
            label: (<span>Quest Love</span>),
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
            label: (<span>Benny Williams</span>),
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
