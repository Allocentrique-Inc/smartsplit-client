import React from 'react';
import '../../assets/scss/page-assistant/option-acces.scss';

export default function OptionAcces(props) {
    return (
        <div className={'access-option-content'}>
            <img src={props.icon} alt={props.title} />

            <div className={'access-text'}>
                <div className={'title'}>
                    {props.title}
                </div>

                <div className={'description'}>
                    {props.description}
                </div>
            </div>
        </div>
    );
}
