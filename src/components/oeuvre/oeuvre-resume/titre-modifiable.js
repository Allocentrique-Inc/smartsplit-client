import React from 'react';
import editIcon from '../../../assets/svg/icons/edit.svg';
import '../../../assets/scss/oeuvre-resume/titre-modifiable.scss';

export default function TitreModifiable(props) {
    return (
        <div className={ 'editable-title' }>
            { props.children }

            <div className={ 'edit-link cliquable' } onClick={()=>{ 
                // Rediriger vers ls modification de l'oeuvre à la page souhaitée

            }}>
                <img className={ 'edit-icon' } src={ editIcon } alt={ 'Édition' }/>
            </div>
        </div>
    );
}
