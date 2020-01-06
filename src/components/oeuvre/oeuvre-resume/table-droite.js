import React from 'react';
import Table from "./table";

export default function TableDroite(props) {
    return (
        <div className="table">
            <Table
                jeton={props.jeton}
                edition={props.edition}
                rows={ props.rows }
                pageNo={ props.pageNo }
                mediaId={ props.mediaId }
            >
                <h4 className={ 'corps-title-2' }>{ props.title }</h4>
            </Table>
        </div>        
    )
}
