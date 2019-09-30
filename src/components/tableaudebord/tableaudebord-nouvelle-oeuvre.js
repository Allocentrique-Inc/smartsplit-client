import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik'
import axios from 'axios'
import { Translation } from 'react-i18next'
import { Label, Modal, Button } from 'semantic-ui-react'
import { ChampTexteAssistant } from '../formulaires/champ-texte'
import BoutonsRadio from '../formulaires/champ-radio'
import RightHolderOptions from '../page-assistant/right-holder-options'
import ChampSelectionMultipleAyantDroit from '../page-assistant/champ-selection-multiple-ayant-droit'
import { Translate } from 'aws-sdk'
import ChampTeleversement from '../page-assistant/champ-televersement'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import AudioLecture from '../oeuvre/audio-lecture'
import { Field } from 'formik'
import moment from 'moment'

const ORIGINALE = 0, ARRANGEMENT = 1, REPRISE = 2

class Apercu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: props.values
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values !== nextProps.values) {
            this.setState({values: nextProps.values})
        }        
    }

    render() {
        return (
            <Translation>
                {
                    t=>
                        <div className="ui column">
                            <div>                                        
                                <p style={{
                                    fontFamily: "IBM Plex Sans",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                    paddingTop: "16px",
                                    color: "#8DA0B3"                                                
                                }}>{t('titre.apercu')}</p>
                                <div className="ui grid">
                                    <div className="ui two wide column">
                                        <i className="file image outline icon big grey" /> 
                                    </div>
                                    <div className="ui twelve wide column">
                                        <p>
                                            {this.state.values.artist || t('titre.oeil-ouvert')}
                                        </p>
                                        <p style={{fontWeight: "bolder"}}>{this.state.values.title || t('titre.apercu-sen-vient')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </Translation>            
        )
    }    

}

class Base extends Component {

    constructor(props){
        super(props)
        this.state = {
            values: props.values
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values !== nextProps.values) {
            this.setState({values: nextProps.values})
        }
    }

    render() {
        return (
            <Translation>
                    {
                        t=>    
                            <>                        
                                <div className="ui row">
                                    <ChampTexteAssistant 
                                        soustexte={t('oeuvre.attribut.indication.titre-soustexte')}
                                        modele="title"
                                        etiquette={t('oeuvre.attribut.indication.titre')}
                                        requis={true}
                                        autoFocus={true}
                                        />
                                </div>
                                <div style={{marginTop: "20px"}} className="ui row">
                                    <BoutonsRadio 
                                        modele="type"
                                        etiquette={t('options.piece.titre')}
                                        actif={this.state.values.type} 
                                        requis={true}                                            
                                        choix={[
                                            {
                                                nom: t('options.piece.originale'),
                                                valeur: ORIGINALE
                                            },
                                            {
                                                nom: t('options.piece.arrangement'),
                                                valeur: ARRANGEMENT
                                            },
                                            {
                                                nom: t('options.piece.reprise'),
                                                valeur: REPRISE
                                            }
                                        ]}
                                        onClick={(e) => {                            
                                            let valeur
                                            // Clic de la puce ou de l'étiquette ?
                                            if(e.target.nodeName === 'LABEL') {
                                                valeur = e.target.parentNode.childNodes[0].value
                                            }
                                            if(e.target.nodeName === 'INPUT') {
                                                valeur = e.target.value
                                            }
                                            this.props.setFieldValue('type', valeur)
                                        }}
                                    />
                                </div>
                            </>
                    }
                </Translation>
        )
    }
}

class PageNouvellePiece extends Component {

    constructor(props) {
        super(props)  
    }    

    render() {

        return (
            <React.Fragment>
                <div className="ui two column grid">
                    <div className="ui column">
                        <Base values={this.props.values} setFieldValue={this.props.setFieldValue}/>
                    </div>
                    <div className="ui column">
                        <Apercu values={this.props.values} setFieldValue={this.props.setFieldValue}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class Page2NouvellePiece extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auteur: props.auteur
        }
        this.modaleReconnaissance = this.modaleReconnaissance.bind(this)
        this.remplirChampsAnalyse = this.remplirChampsAnalyse.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.auteur !== nextProps.auteur) {
            this.setState({auteur: nextProps.auteur})
        }
    }

    modaleReconnaissance(ouvert = true) {
        this.setState({modaleReconnaissance: ouvert})
    }

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

    remplirChampsAnalyse(i18n) {
        
        let analyse = this.state.analyse

        this.props.setFieldValue('title', analyse.title, false)
        this.props.setFieldValue('publisher', analyse.label ? analyse.label : analyse.artists[0].name, false)
        this.props.setFieldValue('artist', analyse.artists[0].name, false)

        // Création des ayant-droits
        /* let ayantDroits = []
        analyse.artists.forEach((artiste, idx) => {            
            let prenom = artiste.name.split(" ").length === 2 ? artiste.name.split(" ")[0] : ""
            let nom = artiste.name.split(" ").length === 2 ? artiste.name.split(" ")[1] : ""
            ayantDroits.push({
                prenom: prenom,
                nom: nom,
                artiste: artiste.name
            })
        })
        this.props.setFieldValue('rightHolders', ayantDroits, false) */
        this.props.setFieldValue('instrumental', true, false)
        this.props.setFieldValue('album', analyse.album.name, false)
        this.props.setFieldValue('durationMs', `${ analyse.duration_ms }`, false)
        this.props.setFieldValue('isrc', analyse.external_ids.isrc, false)
        this.props.setFieldValue('upc', analyse.external_ids.upc, false)
        this.props.setFieldValue('publishDate', analyse.release_date, false)

        // Liens commerciaux
        let liensCommerciaux = []
        if (analyse.external_metadata.deezer) {
            let _url = `https://www.deezer.com/${ i18n.lng.substring(0, 2) }/album/${ analyse.external_metadata.deezer.album.id }`
            liensCommerciaux.push({
                lien: _url,
                type: "deezer"
            })
        }
        if (analyse.external_metadata.spotify) {
            let _url = `https://open.spotify.com/track/${ analyse.external_metadata.spotify.track.id }`
            liensCommerciaux.push({
                lien: _url,
                type: "spotify"
            })
        }
        if (analyse.external_metadata.youtube) {
            let _url = `https://www.youtube.com/watch?v=${ analyse.external_metadata.youtube.vid }`
            liensCommerciaux.push({
                lien: _url,
                type: "youtube"
            })
        }
        this.props.setFieldValue('streamingServiceLinks', liensCommerciaux)        
    }

    render() {

        return (
            <React.Fragment>
                <Translation>
                    {
                        (t, i18n)=>
                            <>                                                              
                                <div className="ui two column grid">
                                    <div className="ui column">
                                        {
                                            this.state.patience &&
                                            (
                                                <div className="container ui active dimmer">
                                                    <div className="ui text loader">{t("televersement.encours")}</div>
                                                </div>
                                            )
                                        }
                                        <ChampTeleversement                                          
                                            label={t('composant.televersement.titre')}
                                            undertext={t('composant.televersement.soustitre')}                                     
                                            onFileChange={ value => {
                                                
                                                if(value) {
                                                    toast.info(t('navigation.transfertEnCours'))
                                                    this.setState({patience: true})                                                
            
                                                    let fichier = value
            
                                                    // Redémarre le lecteur audio
                                                    this.props.parent.props.parent.state.audio.stopEtJouer(fichier)
        
                                                    let fd = new FormData()
                                                    fd.append('file', fichier)
        
                                                    axios
                                                        .post('http://envoi.smartsplit.org:3033/envoi', fd)
                                                        .then(res=>{
    
                                                            let f = res.data
    
                                                            if (f.music.err) {
                                                                switch (f.music.err) {
                                                                    case "AUDIO-MAUVAISE-LECTURE":
                                                                        toast.warn(t('traitement.acr.erreur-mauvaise-lecture'))
                                                                        break;
                                                                    case "AUDIO-INCONNU":
                                                                        toast.warn(t('traitement.acr.erreur-inconnu'))
                                                                        break;
                                                                    default:
                                                                        toast.warn(f.music.err)
                                                                }
                                                            }
            
                                                            if (f && !f.music.err) {
            
                                                                //this.props.setFieldValue('fichiers', f, false)
            
                                                                let analyse = f.music[0] // Il peut y avoir plus d'un résultat
            
                                                                toast.success(t('flot.envoifichier.reussi') + ` ${ f.empreinte }`)
                                                                this.setState({analyse: analyse}, ()=>this.modaleReconnaissance()) 
                                                                this.props.setFieldValue('fichier', f.empreinte)                                                       
                                                                
                                                            }
                                                        })
                                                        .catch(err=>{
                                                            if(err) {
                                                                console.log(err)
                                                                if(fichier)
                                                                    toast.error(t('flot.envoifichier.echec') + ` ${fichier.name}`)
                                                            }                                                        
                                                        })
                                                        .finally(()=>{
                                                            this.setState({patience: false})                                                
                                                        })
                                                                                                            
                                                    this.props.parent.setState({fichier: value})
                                                
                                                }                                                                                                

                                            }                                            
                                            }
                                            onAccessChange={value=>console.log(value)}
                                        />
                                        <Base values={this.props.values} setFieldValue={this.props.setFieldValue}/>
                                        {
                                            this.props.values.type === ""+ORIGINALE && (
                                                <>
                                                    <div style={{marginTop: "20px"}} className="ui row">
                                                        <ChampTexteAssistant 
                                                            modele="artist"
                                                            etiquette={t('oeuvre.attribut.etiquette.piecePar', {titre: this.props.values.title})}
                                                            requis={true}
                                                            />
                                                    </div>                                                    
                                                </>
                                            )
                                        }                                        
                                        {
                                            this.props.values.type === ""+ARRANGEMENT && (
                                                <>
                                                    <div style={{marginTop: "20px"}} className="ui row">
                                                        <ChampTexteAssistant 
                                                            modele="artist"
                                                            etiquette={t('oeuvre.attribut.etiquette.artiste')}
                                                            requis={true}
                                                            />
                                                    </div>
                                                    <div style={{marginTop: "20px"}} className="ui row">                                                    
                                                        <ChampTexteAssistant 
                                                            modele="arrangeur"
                                                            etiquette={t('oeuvre.attribut.etiquette.arrangementPar', {titre: this.props.values.title})}
                                                            indication={t('oeuvre.attribut.indication.arrangeur')}
                                                            requis={true}
                                                            />
                                                    </div>
                                                </>
                                            )
                                        }

                                        <div style={{marginTop: "20px"}} className="ui row">
                                            <ChampSelectionMultipleAyantDroit
                                                pochette={ this.props.pochette }
                                                items={ this.rightHolderOptions() }
                                                label={ t('oeuvre.titre.vedette') }
                                                createLabel="Créer un nouveau collaborateur"
                                                placeholder={ t('oeuvre.attribut.indication.vedette') }
                                                value={ this.state.vedettes }
                                                onChange={ ids => this.props.setFieldValue('vedettes', ids) }
                                            />
                                        </div>                                        

                                    </div>

                                    <div className="ui column">
                                        <Apercu parent={this} values={this.props.values} setFieldValue={this.props.setFieldValue}/>
                                    </div>                                    

                                </div>

                                {
                                    this.state.analyse && (
                                        <Modal
                                            open={this.state.modaleReconnaissance}
                                            onClose={()=>this.modaleReconnaissance(false)}>    
                                            <Modal.Header>{t('flot.acr.titre')}</Modal.Header>
                                            <Modal.Content>
                                                <Label>{t('oeuvre.attribut.etiquette.titre')}</Label><span>{this.state.analyse.title}</span><p/>
                                                <Label>{t('oeuvre.attribut.etiquette.artiste')}</Label><span>{this.state.analyse.artists && this.state.analyse.artists[0] && this.state.analyse.artists[0].name}</span><p/>
                                                <Label>{t('oeuvre.attribut.etiquette.editeur')}</Label><span>{this.state.analyse.label}</span><p/>
                                                <Label>{t('oeuvre.attribut.etiquette.album')}</Label><span>{this.state.analyse.album && this.state.analyse.album.name}</span><p/>
                                                <Label>{t('oeuvre.attribut.etiquette.isrc')}</Label><span>{this.state.analyse.external_ids && this.state.analyse.external_ids.isrc}</span><p/>
                                                <Label>{t('oeuvre.attribut.etiquette.datePublication')}</Label><span>{this.state.analyse.release_date}</span><p/>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                    <Button onClick={()=>this.modaleReconnaissance(false)} negative>{t('flot.acr.non')}</Button>
                                                    <Button onClick={()=>{this.remplirChampsAnalyse(i18n); ; this.modaleReconnaissance(false)}} positive icon='checkmark' labelPosition='right' content={t('flot.acr.oui')} />
                                            </Modal.Actions>
                                        </Modal>
                                    )
                                }                                
                            </>
                    }                    
                </Translation>
            </React.Fragment>
        )
    }
}

export default class NouvelleOeuvre extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            user: props.user
        }
        this.soumettre = this.soumettre.bind(this)
        this.changementPage = this.changementPage.bind(this)
        this.changement = this.changement.bind(this)
    }

    componentWillMount() {
        axios.get(`http://dev.api.smartsplit.org:8080/v1/rightHolders`)
        .then(res=>{
            this.setState({rightHolders: res.data})
        })
    }

    changement(values) {
        this.setState({valeurs: values})
    }

    changementPage(no, t) {
        if(no === 1 && !this.state.mediaId) {
            // On arrive sur la page 1 de la page 0
            // Création de l'oeuvre avec uniquement le titre et le type

            let title = this.state.valeurs.title
            let type

            if (this.state.valeurs.type === "0") {
                type = "ORIGINALE"
            }
            if (this.state.valeurs.type === "1") {
                type = "ARRANGEMENT"
            }
            if (this.state.valeurs.type === "2") {
                type = "REPRISE"
            }

            axios.put(`http://dev.api.smartsplit.org:8080/v1/media`, {title: title, type: type, creator: this.state.user.username})
            .then(res=>{
                // Enregistrement du mediaId pour sauvegarde des données dans handleSubmit                
                toast.info(t('info.oeuvre.creation', {id: res.data.id}))
                this.setState({mediaId: res.data.id})
                this.props.parent.setState({mediaId: res.data.id}) // Condition d'apparition du lecteur audio
            })
        }
    }

    soumettre(values, t) {        

        let body = {
            creator: this.props.user.username,
            mediaId: this.state.mediaId,
            title: values.title,
            album: values.album,
            artist: values.artist,
            msDuration: values.durationMs,
            type: values.type,
            publishDate: values.publishDate,
            publisher: values.publisher,
            rightHolders: values.rightHolders,
            socialMediaLinks: values.socialMediaLinks,
            streamingServiceLinks: values.streamingServiceLinks,
            pressArticleLinks: values.pressArticleLinks,
            playlistLinks: values.playlistLinks,
            audioFile: values.fichier,
            remixer: values.arrangeur
        }
        body.mediaId = this.state.mediaId
        this.props.parent.state.audio.stop()

        axios.post(`http://dev.api.smartsplit.org:8080/v1/media`, body)
        .then(res=>{
            window.location.href = `/oeuvre/sommaire/${body.mediaId}`
        })
        .catch(err=>console.log(err))
 
    }

    setFichier(fichier) {
        this.setState({fichier: fichier})
    }

    render() {        

        if(this.state.rightHolders) {
            return (
                <Translation>
                    {
                        t=>
                            <div>                                
                                <Wizard
                                    initialValues={{
                                        title: undefined,
                                        type: undefined
                                    }}
                                    buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('flot.split.navigation.cest-parti')}}
                                    debug={false}         
                                    onPageChanged={no=>this.changementPage(no, t)}                       
                                    onSubmit={(values, {setSubmitting})=>{this.soumettre(values, t); setSubmitting(false) }}
                                    style={{width: "80%"}}

                                >
                                    <Wizard.Page
                                        validate={values=>{                                        
                                            this.changement(values)
                                            const errors = {};
                                            if (!values.title) {
                                                errors.title = "Obligatoire"
                                            }
                                            return errors
                                        }}>                                
                                        <PageNouvellePiece parent={this} rightHolders={this.state.rightHolders} />
                                    </Wizard.Page>
                                    <Wizard.Page>
                                        <Page2NouvellePiece parent={this} rightHolders={this.state.rightHolders} parent={this} />
                                    </Wizard.Page>                                    

                                </Wizard>                               
                                {this.state.patience && (
                                    <div className="container ui active dimmer">
                                        <div className="ui text loader">{t("entete.encours")}</div>
                                    </div>
                                )}
                            </div>
                    }                
                </Translation>            
            )
        } else {
            return (<></>)
        }

        
    }
}