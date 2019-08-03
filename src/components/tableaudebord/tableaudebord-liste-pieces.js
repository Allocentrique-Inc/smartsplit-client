import React, {Component} from 'react'
import { Translation } from 'react-i18next'
import axios from 'axios'

import { toast } from 'react-toastify'

// Images de partage
import image1 from '../../assets/images/image1.png'
import image2 from '../../assets/images/image2.png'
import imageIcon from '../../assets/images/imageIcon.png'
import { restElement } from '@babel/types';

export default class ListePieces extends Component {

    constructor(props) {
        super(props)
        this.state={medias:[]}
    }

    componentWillMount() {

        axios.get('http://api.smartsplit.org:8080/v1/media')
        .then((res)=>{
            this.setState({medias:res.data})
        })
        .catch((error) => {
            toast.error(error)            
        })

    }

    render() {

        let tableauMedias = []
        if(this.state.medias.length > 0) {
          tableauMedias = this.state.medias.map((elem, _idx)=>{                
            return (
                <div key={_idx} style={{marginTop: "20px"}}>
                    <div className="ui three column grid">
                        <div className="ui row">
                            <div className="ui seven wide column">
                                <div className="ui three column grid">
                                    <div className="ui row">
                                        <div className="ui one wide column">
                                            <img src={imageIcon}/>
                                        </div>
                                        <div className="ui one wide column">
                                            <div className="song-name">{`${elem.title}`}</div>
                                            <div class="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;Par&nbsp;</div><div class="small-500-color" style={{display: "inline-block"}}>{`${elem.artist}`}</div>
                                            <br/>
                                            <div class="small-400-color" style={{display: "inline-block"}}>Modifié il y a 2 jours &bull; Partagée avec</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui three wide column">
                                <img src={image1}/>
                            </div>
                            <div className="ui three wide column">
                                <img src={image2}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}

        return (
            <Translation>
                {
                    t=>
                        <div>
                            <div class="heading2">{t('tableaudebord.navigation.0')}</div>

                            <br/>

                            <div class="medium-500">Mes ajouts</div>

                            <ul>{tableauMedias}</ul>
                            
                        </div>
                }
            </Translation>
        )
    }
}