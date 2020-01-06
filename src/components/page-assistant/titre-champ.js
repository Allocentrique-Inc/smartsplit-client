import React from "react";
import '../../assets/scss/page-assistant/titre-champ.scss';

export default function TitreChamp(props) {
    return props.label || props.description ?
        (
            <div className="input-title">
                {inputLabel(props)}
                {inputDescription(props)}
                {props.info} {/*Indique que tous les champs auront propriété info, composantes remontent à cette source*/}
            </div>
        ) :
        (<div className="input-title">
            {inputLabel(props)}
            {inputDescription(props)}
            {props.info} {/*Indique que tous les champs auront propriété info, composantes remontent à cette source*/}
        </div>);
}

function inputLabel(props) {
    return props.label ?
        (<div className="input-label" style={{ display: "inline" }}>{props.label}</div>) :
        (<div className="input-label" style={{ display: "inline" }}>&nbsp;</div>);
}

function inputDescription(props) {
    return props.description ?
        (<p className="input-description">{props.description}</p>) :
        (<></>);
}
