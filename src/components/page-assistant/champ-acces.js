import React from 'react';
import TitreChamp from "./titre-champ";
import { Dropdown } from "semantic-ui-react";

export default class ChampAcces extends React.Component {
    accessOptions = [
        {
            key: 'public',
            value: 'public',
            text: 'Public',
        },
        {
            key: 'private',
            value: 'private',
            text: 'Privé',
        },
        {
            key: 'on-invite',
            value: 'on-invite',
            text: 'Sur invitation',
        }
    ];

    render() {
        return (
            <div className="champ champ-acces">
                <label>
                    <TitreChamp
                        label={ 'Accès' }
                    />

                    <Dropdown
                        fluid
                        selection
                        options={ this.accessOptions }
                    />
                </label>
            </div>
        );
    }
}
