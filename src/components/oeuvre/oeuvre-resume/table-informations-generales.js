import React from 'react';
import TableDroite from "./table-droite";
import { Translation } from 'react-i18next';

export default class TableInformationsGenerales extends React.Component {
    
    constructor(props) {
        super(props)
        this.state={
            
        }
    }

    rangees(t, i18n) {

        let duree = Math.round(this.props.media.msDuration / 1000)

        let minutes, secondes
        if(duree > 0) {
            let _min = Math.floor(duree / 60)
            let _sec = duree % 60
            minutes = ""+_min
            secondes = ""+_sec
        }

        return [
            {
                label: 'Durée',
                value: secondes ? minutes+":"+secondes : "Inconnue"
            },
            {
                label: 'BPM',
                value: this.props.media.bpm
            },
            {
                label: 'Genre',
                value: this.props.media.genre
            },
            {
                label: 'Styles',
                value: this.props.media.secondaryGenre ? this.props.media.secondaryGenre.map((e, idx)=>{
                    if(idx < this.props.media.secondaryGenre.length - 1) {
                        return e + ", "
                    } else {
                        return e
                    }
                }) : []
            },
            {
                label: 'Influences',
                value: this.props.media.influence
            },
        ]
    }

    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <TableDroite
                            pageNo={ 5 }
                            mediaId={ this.props.media.mediaId }
                            title={ 'Information générales' }
                            rows={ this.rangees(t, i18n) }
                        />                    
                }
            </Translation>            
        );
    }
}
