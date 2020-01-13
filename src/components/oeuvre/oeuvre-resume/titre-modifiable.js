import React from 'react';
import editIcon from '../../../assets/svg/icons/edit.svg';
import '../../../assets/scss/oeuvre-resume/titre-modifiable.scss';

export default function TitreModifiable(props) {
    return (
        <div className={ 'editable-title' }>
            { props.children }
            {
                props.edition && (
                    <div className={ 'edit-link cliquable' } onClick={()=>{ 
                        // Rediriger vers ls modification de l'oeuvre à la page souhaitée
                        window.location.href=`/editer/${props.mediaId}/${props.pageNo}/${props.jeton || ""}`
                    }}>
                        <img className={ 'edit-icon' } src={ editIcon } alt={ 'Édition' }/>
                    </div>
                )
            }            
        </div>
    );
}
