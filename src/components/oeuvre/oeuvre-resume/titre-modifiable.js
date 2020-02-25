import React from 'react';
import { useHistory } from "react-router"
import editIcon from '../../../assets/svg/icons/edit.svg';
import '../../../assets/scss/oeuvre-resume/titre-modifiable.scss';

export default function TitreModifiable(props) {
    const history = useHistory()

    function naviguer() {
        history.push(`/editer/${props.mediaId}/${props.pageNo}/${props.jeton || ""}`)
    }

    return (
        <div className={ 'editable-title' }>
            { props.children }
            {
                props.edition && (
                    <div className={ 'edit-link click' } onClick={naviguer}>
                        <img className={ 'edit-icon' } src={ editIcon } alt={ 'Édition' }/>
                    </div>
                )
            }
        </div>
    );
}
