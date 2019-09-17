import React from 'react';
import helpIcon from "../../../assets/svg/icons/help-circle-full.svg";

export default function Rangee(props) {
    const placeholder = 'Ajouter cette information';

    return (
        <tr>
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

