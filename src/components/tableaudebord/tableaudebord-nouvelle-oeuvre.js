import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik'
import axios from 'axios'
import { Translation } from 'react-i18next'
import { Label } from 'semantic-ui-react'
import { ChampTexteAssistant } from '../formulaires/champ-texte'
import BoutonsRadio from '../formulaires/champ-radio'
import RightHolderOptions from '../page-assistant/right-holder-options'
import ChampSelectionMultipleAyantDroit from '../page-assistant/champ-selection-multiple-ayant-droit'
import { Translate } from 'aws-sdk'
import ChampTeleversement from '../page-assistant/champ-televersement'
import { toast } from 'react-toastify'

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
                            <div style={{background: "#FAF8F9", borderRadius: "2px", minHeight: "112px", width: "100%"}}>                                        
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
                                }}>{t('flot.split.titre.apercu')}</p>
                                <div className="ui grid">
                                    <div className="ui two wide column">
                                        <i className="file image outline icon big grey" /> 
                                    </div>
                                    <div className="ui twelve wide column">
                                        <p>
                                            {this.state.values.artiste || t('flot.split.titre.oeil-ouvert')}
                                        </p>
                                        <p style={{fontWeight: "bolder"}}>{this.state.values.titre || t('flot.split.titre.apercu-sen-vient')}</p>
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
                                        modele="titre"
                                        etiquette={t('oeuvre.attribut.indication.titre')}
                                        requis={true}
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
                                                nom: t('flot.split.options.piece.originale'),
                                                valeur: ORIGINALE
                                            },
                                            {
                                                nom: t('flot.split.options.piece.arrangement'),
                                                valeur: ARRANGEMENT
                                            },
                                            {
                                                nom: t('flot.split.options.piece.reprise'),
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

    componentWillReceiveProps(nextProps) {       
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
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.auteur !== nextProps.auteur) {
            this.setState({auteur: nextProps.auteur})
        }
    }

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

    render() {

        return (
            <React.Fragment>
                <Translation>
                    {
                        t=>
                            <>                                
                                <div className="ui two column grid">
                                    <div className="ui column">
                                        <Base values={this.props.values} setFieldValue={this.props.setFieldValue}/>
                                        {
                                            this.props.values.type === ""+ORIGINALE && (
                                                <>
                                                    <div style={{marginTop: "20px"}} className="ui row">
                                                        <ChampTexteAssistant 
                                                            modele="artiste"
                                                            etiquette={t('oeuvre.attribut.etiquette.piecePar', {titre: this.props.values.titre})}
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
                                                            modele="artiste"
                                                            etiquette={t('oeuvre.attribut.etiquette.artiste')}
                                                            requis={true}
                                                            />
                                                    </div>
                                                    <div style={{marginTop: "20px"}} className="ui row">                                                    
                                                        <ChampTexteAssistant 
                                                            modele="arrangeur"
                                                            etiquette={t('oeuvre.attribut.etiquette.arrangementPar', {titre: this.props.values.titre})}
                                                            indication={t('oeuvre.attribut.indication.arrangeur')}
                                                            requis={true}
                                                            />
                                                    </div>
                                                </>
                                            )
                                        }

                                        <div style={{marginTop: "20px", width: "350px"}} className="ui row">
                                            <ChampSelectionMultipleAyantDroit
                                                pochette={ this.props.pochette }
                                                items={ this.rightHolderOptions() }
                                                label={ t('oeuvre.titre.vedette') }
                                                createLabel="Créer un nouveau collaborateur"
                                                placeholder={ t('oeuvre.attribut.etiquette.vedette') }
                                                value={ this.state.vedettes }
                                                onChange={ ids => this.props.setFieldValue('vedettes', ids) }
                                            />
                                        </div>

                                        <ChampTeleversement
                                            label={t('composant.televersement.titre')}
                                            undertext={t('flot.split.documente-ton-oeuvre.composant.televersement.soustitre')}                                     
                                            onFileChange={ value => {this.props.setFieldValue('fichier', value.name); this.props.parent.setState({fichier: value})} }
                                            acces={false}
                                        />

                                    </div>

                                    <div className="ui column">
                                        <Apercu values={this.props.values} setFieldValue={this.props.setFieldValue}/>
                                    </div>                                    

                                </div>                                
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
        if(no === 1) {
            // On arrive sur la page 1 de la page 0
            // Création de l'oeuvre avec uniquement le titre et le type

            let titre = this.state.valeurs.titre
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
            
            axios.put(`http://dev.api.smartsplit.org:8080/v1/media`, {title: titre, type: type})
            .then(res=>{
                // Enregistrement du mediaId pour sauvegarde des données dans handleSubmit                
                toast.info(t('info.oeuvre.creation', {id: res.data.id}))
            })
        }
    }

    soumettre(values, t) {

        this.props.parent.modaleNouvelleOeuvre(false)

        let body = {

        }

        if(values.fichier) {
            // Envoi vers le service de fichiers
            this.setState({patience: true})
            
            let fd = new FormData()
            fd.append('file', values.fichier)

            axios
                .post('http://envoi.smartsplit.org:3033/envoi', fd)
                .then(res=>{                                                
                    this.props.apres(res.data)
                })
                .catch(err=>{
                    toast.error(t('flot.envoifichier.echec'))
                })
                .finally(()=>{
                    this.setState({patience: false})                                                
                })
        }        

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
                            <>
                                <Wizard
                                    initialValues={{
                                        titre: undefined,
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
                                            if (!values.titre) {
                                                errors.titre = "Obligatoire"
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
                            </>
                    }                
                </Translation>            
            )
        } else {
            return (<></>)
        }

        
    }
}