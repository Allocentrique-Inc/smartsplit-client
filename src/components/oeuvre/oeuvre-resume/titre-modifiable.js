import React from 'react';
import editIcon from '../../../assets/svg/icons/edit.svg';
import '../../../assets/scss/oeuvre-resume/titre-modifiable.scss';

export default class TitreModifiable extends React.Component {
    render() {
        return (
            <div className={ 'editable-title' }>
                { this.props.children }

                <a className={ 'edit-link' } href={ this.props.href }>
                    <img className={ 'edit-icon' } src={ editIcon } alt={ 'Édition' }/>
                </a>
            </div>
        )
    }
}
