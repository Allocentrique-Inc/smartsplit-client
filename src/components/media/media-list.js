import React, { Component } from 'react'
//import MUIDataTable from 'mui-datatables'

export default class MediaList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            donnees: []
        }        
    }

    componentDidMount() {
        // Récupère la liste des médias
        this.listeMedias()
    }

    listeMedias() {

        console.log('Liste des médias ...')

        // Récupérer la liste des médias depuis l'API// Transmettre à l'API (configuration locale statique)
        const options = {
            method: 'GET',
            credentials: 'omit',
            headers: {             
            }
        }        

        fetch('http://127.0.0.1:8080/v1/media', options).then((response) => {
            return response.json()
        })
        .then((jsonObject) => {
            console.log(jsonObject)
            this.setState({donnees: jsonObject})
        })
        .catch((error) => {
            alert(error)
            throw(error)
        })
    }

    render() {
        /*
        // Structure des colonnes
        const colonnes = [            
            {
                name: "mediaId",
                label: "ID",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "title",
                label: "Titre",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "album",
                label: "Album",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "description",
                label: "Description",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "cover",
                label: "Reprise",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "right-holders",
                label: "Ayants-droit",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "jurisdiction",
                label: "Juridiction",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "rights-type",
                label: "Types de droit",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "genre",
                label: "Genre",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "creation-date",
                label: "Créé",
                options: {
                    filter: true,
                    sort: true,
                }
            },           
            {
                name: "publisher",
                label: "Éditeur",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "split",
                label: "Répartition",
                options: {
                    filter: false,
                    sort: false,
                }
            }
        ]

        // Options
        const options = {
            filterType: 'checkbox'
        }
        */

        let table = (
            <pre>
                {this.state.donnees}
            </pre>                
        )

        return (
            <div>
                {this.state.donnees.length > 0 && table}
            </div>            
        )
    }
}