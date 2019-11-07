import React from 'react';
import editIcon from '../../../assets/svg/icons/edit.svg';
import '../../../assets/scss/oeuvre-resume/titre-modifiable.scss';

export default function TitreModifiable(props) {
    return (
        <div className={ 'editable-title' }>
            { props.children }

            {/* <a className={ 'edit-link' } href={ props.href }>
                <img className={ 'edit-icon' } src={ editIcon } alt={ 'Édition' }/>
            </a> */}
        </div>
    );
}
