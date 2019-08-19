import React from 'react';
import xIcon from "../../assets/svg/icons/x.svg";

export function ItemSelectionne(props) {
    return (
        <div className="selection-row"
             onClick={ (event) => props.onClick(event) }
        >
            <div className="left">
                <div className="selection-avatar">
                    <img src={ props.image }
                         alt={ props.nom }
                    />
                </div>

                <div className="selection-name">
                    { props.nom }
                </div>
            </div>

            <div className="right">
                <img className="x-icon"
                     src={ xIcon }
                     alt={ 'Enlever ' + props.nom }
                />
            </div>
        </div>
    );
}