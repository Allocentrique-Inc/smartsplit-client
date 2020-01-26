import React from 'react';
import TitreModifiable from "./titre-modifiable";
import Rangee from "./rangee";

export default class Table extends React.Component {
    render() {
        return (
            <>
                <TitreModifiable jeton={this.props.jeton} edition={this.props.edition} pageNo={this.props.pageNo} mediaId={this.props.mediaId}>
                    {this.props.children}
                </TitreModifiable>

                <table className={'corps-table'}>
                    <tbody>
                        {this.props.rows.map((row, idx )=> <Rangee key={`rangee_${idx}`} {...row} />)}
                    </tbody>
                </table>
            </>
        )
    }
}
