import React from 'react'
import helpIcon from "../../../assets/svg/icons/help-circle-full.svg"
const uuidv1 = require("uuid/v1")

export default function Rangee(props) {
    const placeholder = 'Ajouter cette information';
    let uuid = uuidv1()
    return (
        <tr key={`rangee-${uuid}`}>
            <td className={ 'table-label' }>
                { props.label } { renderHelpIcon(props) }
            </td>

            <td className={ props.value ? '' : 'placeholder' }>
                { props.value || placeholder }
            </td>
        </tr>
    );
}

function renderHelpIcon(props) {
    return props.helpIcon ?
        (<img className={ 'help-icon' } src={ helpIcon } alt={ 'Aide' }/>) :
        (<></>);
}

