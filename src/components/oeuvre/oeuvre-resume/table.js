import React from 'react';
import TitreModifiable from "./titre-modifiable";
import Rangee from "./rangee";

export default class Table extends React.Component {
    render() {
        return (
            <>
                <TitreModifiable pageNo={ this.props.pageNo } mediaId={ this.props.mediaId }>
                    { this.props.children }
                </TitreModifiable>

                <table className={ 'corps-table' }>
                    <tbody>
                        { this.props.rows.map(row => Rangee(row)) }
                    </tbody>
                </table>
            </>
        )
    }
}
