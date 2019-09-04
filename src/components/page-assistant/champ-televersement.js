import React from 'react';
import ChampFichier from "./champ-fichier";
import ChampAccesTelechargement from "./champ-acces-telechargement";

export default function ChampTeleversement(props) {
    return (
        <div className="section-televersement">
            <ChampFichier
                label={ props.label }
                undertext={ props.undertext }
            />

            <ChampAccesTelechargement
                value={ props.defaultAccessValue }
            />
        </div>
    );
}

