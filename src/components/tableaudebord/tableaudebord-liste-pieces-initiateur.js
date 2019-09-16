import React, {Component} from 'react'
import { Translation } from 'react-i18next'
import axios from 'axios'
import { Auth } from 'aws-amplify';

import { toast } from 'react-toastify'


export default class ListePiecesInitiateur extends Component {

    constructor(props) {
        super(props)
        this.state={
            medias:[],
            collabMedias:[]
        }
    }

    componentWillMount() {

        try{
            Auth.currentSession().then(
                session=>{
                let that = this
                let USER_ID = session.idToken.payload.sub       

                axios.get('http://api.smartsplit.org:8080/v1/proposal')
                .then((res) => {
                    let initiatorMediaIds = []
                    let collabMediaIds = []

                    res.data.forEach(function(item){
                        if (item.initiator.id === USER_ID){
                            initiatorMediaIds.push(item.mediaId) // If initiator
                        } 
                        else if (item.initiator.id == undefined){
                            toast.error("Initiator undefined")
                        } 
                        if((JSON.stringify(item.rightsSplits)).includes(USER_ID)){
                            collabMediaIds.push(item.mediaId) // If collaborator
                        } else if (item.rightsSplits == undefined) {
                            toast.error("rightsSplits object error")
                        }
                    })
                    let _medias = [];
                    let count = '';
                    let _collabMedias = [];
                    let ii = '';

                    initiatorMediaIds.forEach(async function(element) {
                        const res = await axios.get('http://api.smartsplit.org:8080/v1/media/' + element)
                        _medias.push(res.data.Item)
                        count++
                        if (initiatorMediaIds.length == count) {
                            that.setState({medias: _medias})
                        }
                        return _medias;
                    });

                    collabMediaIds.forEach(async function(elm) {
                        const res = await axios.get('http://api.smartsplit.org:8080/v1/media/' + elm)
                        _collabMedias.push(res.data.Item)
                        ii++
                        if (collabMediaIds.length == ii) {
                            that.setState({collabMedias: _collabMedias})
                        }
                        return _collabMedias;
                    });

                })
                .catch((error) => {
                    toast.error(error)            
                })

            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {

        let tableauMedias = []
        if(this.state.medias.length > 0) {
          tableauMedias = this.state.medias.map((elem, _idx)=>{
            return (
                <div key={_idx} style={{marginTop: "20px"}}>
                    <div className="ui three column grid">
                        <div className="ui row">
                            <div className="ui thirteen wide column">
                                <div className="ui three column grid cliquable" onClick={()=>{window.location.href = `/oeuvre/sommaire/${elem.mediaId}`}} >
                                    <div className="ui row">
                                        <div className="ui one wide column">
                                            <i className="file image outline icon big grey"></i>
                                        </div>
                                        <div className="ui fifteen wide column">
                                            <div className="song-name">{`${elem.title}`}</div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;Par&nbsp;</div><div className="small-500-color" style={{display: "inline-block"}}>{`${elem.artist}`}</div>
                                            <br/>
                                            <div className="small-400-color" style={{display: "inline-block"}}>Modifié il y a 2 jours &bull; Partagée avec</div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            )
        })} 
        else if (this.state.medias.length == 0) {
            return (
                <div key="blank"style={{marginTop: "20px"}}>
                    <div className="ui three column grid">
                        <div className="ui row">
                            <div className="ui thirteen wide column">
                                <div className="ui row">
                                <div className="heading2">My Musical Pieces</div>
                                    <br/>
                                <div className="medium-500">Mes ajouts</div>
                                    <br/>
                                    <br/>
                                    <div className="illustration">
                                        <h1 className="empty-eyes">👀</h1>
                                    </div>
                                    <div className="ui fifteen wide column">
                                        <br/>
                                        <h3> Tes oeuvres apparaîtrons ici. </h3>
                                        <p> Documente et partage les droits sur ta première oeuvre musicale en utilisant le bouton «Ajouter». </p>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <Translation>
                {
                    t=>
                        <div>
                            <div className="heading2">{t('tableaudebord.navigation.0')}</div>
                            <br/>
                            <div className="medium-500">Mes ajouts</div>
                            <ul>{tableauMedias}</ul>                            
                        </div>
                }
            </Translation>
        )
    }
}