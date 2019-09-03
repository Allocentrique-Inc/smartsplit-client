import React from "react";
import '../../assets/scss/page-assistant/titre-champ.scss';

export default function TitreChamp(props) {
    return props.label || props.description ?
        (
            <div className="input-title">
                { inputLabel(props) }
                { inputDescription(props) }
            </div>
        ) :
        (<></>);
}

function inputLabel(props) {
    return props.label ?
        (<div className="input-label">{ props.label }</div>) :
        (<></>);
}

function inputDescription(props) {
    return props.description ?
        (<p className="input-description">{ props.description }</p>) :
        (<></>);
}
