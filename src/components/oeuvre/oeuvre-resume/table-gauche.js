import React from 'react'
import Table from "./table"

export default function TableGauche(props) {
    return (
        <div className="table">
            <Table jeton={props.jeton} edition={props.edition} rows={ props.rows } pageNo={ props.pageNo } mediaId={ props.mediaId } >
                <h3 className={ 'corps-title-1' }>{ props.title }</h3>
            </Table>
        </div>        
    )
}
