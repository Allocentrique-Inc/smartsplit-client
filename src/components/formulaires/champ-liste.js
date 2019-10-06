import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik'
import { Form, Header, Image } from 'semantic-ui-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import ModifyUser from '../auth/ModifyUser';

function required(value) {
    const result = value ? undefined : "Une sélection dans cette liste est obligatoire"
    return result
}

export class ChampListeAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            fluid: props.fluid,
            multiple: props.multiple,
            recherche: props.recherche,
            selection: props.selection,
            options: props.options,
            ajout: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
        if (this.props.options !== nextProps.options) {
            this.setState({options: nextProps.options})
        }
        if (this.props.requis !== nextProps.requis) {
            this.setState({requis: nextProps.requis})
        }
    }

    render() {
        return(
            <div>
                <Wizard.Field
                    name={this.state.modele}
                    component={Form.Dropdown}                
                    componentProps={{
                        label: this.state.etiquette,
                        placeholder: this.state.indication,
                        required: this.state.requis,
                        autoFocus: this.state.autoFocus,
                        fluid: this.state.fluid,
                        multiple: this.state.multiple,
                        search: this.state.recherche,
                        selection: this.state.selection,
                        options: this.state.options,
                        allowAdditions: true,
                        onAddItem: this.handleAddition,
                        clearable: true
                    }}
                    validate={this.state.requis && required}

                />
                <ModifyUser 
                    open={this.state.open} />
                <i className="right info circle icon blue"></i>
            </div>
        )        
    }

}

export class ChampListeEntiteMusicaleAssistant extends Component {

    constructor(props) {
        super(props)
        if(this.props.onRef)
            this.props.onRef(this)
        this.state = {
            rightHolderId: props.rightHolderId, // uuid de l'ayant-droit qui consulte la liste
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            fluid: props.fluid,
            multiple: props.multiple,
            recherche: props.recherche,
            selection: props.selection,
            onInput: props.onInput,
            ajout: true,
            nomCommeCle: props.nomCommeCle
        }
        this.OPTIONS = undefined
        this.listeAyantsDroit = this.listeEntites.bind(this)
        this.onChange = props.onChange
    }

    componentWillMount() {
        this.listeEntites()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
        if (this.props.collaborateurs !== nextProps.collaborateurs) {            
            this.recalculerOptions(nextProps.collaborateurs)
        }
    }

    listeEntites() {
        // Récupérer la liste des ayant-droits        
        axios.get(`http://api.smartsplit.org:8080/v1/entities`)
        .then(res=>{

            let aOptions = []

            res.data.forEach((elem)=>{
                if(!this.state.rightHolderId || elem.members.includes(this.state.rightHolderId)) {
                    aOptions.push({
                        key: elem.uuid,
                        text: elem.name,
                        value: elem.name
                    })
                }
            })            
            if(!this.OPTIONS) {
                this.OPTIONS = aOptions
            }            
            this.setState({options: aOptions})
        })
        .catch(err=>{
            toast.error(err)
        })
    }

    render() {
        return(
            <div>
                {
                    this.state.options && (
                        <Wizard.Field                
                            name={this.state.modele}
                            component={Form.Dropdown}
                            componentProps={{
                                id: "entiteArtistique",
                                label: this.state.etiquette,
                                placeholder: this.state.indication,
                                required: this.state.requis,
                                autoFocus: this.state.autoFocus,
                                fluid: true,
                                search: true,
                                selection: false,
                                multiple: false,
                                options: this.state.options,                                
                                allowAdditions: false,
                                clearable: false
                            }}
                            
                        />
                    ) 
                }       
                <ModifyUser 
                    open={this.state.open} 
                    firstName={this.state.firstName}
                    close={()=>{
                        this.setState({open: false}, ()=>{
                            if(this.props.close) {
                                this.props.close()
                            }
                        })                        
                    }}
                    fn={()=>{
                        this.listeEntites()                    
                    }}
                    />  
            </div>
        )        
    }
}

export class ChampListeCollaborateurAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            fluid: props.fluid,
            multiple: props.multiple,
            recherche: props.recherche,
            selection: props.selection,
            onInput: props.onInput,
            ajout: true,
            nomCommeCle: props.nomCommeCle
        }
        this.OPTIONS = undefined
        this.listeAyantsDroit = this.listeAyantsDroit.bind(this)
        this.onChange = props.onChange
    }

    componentWillMount() {
        this.listeAyantsDroit()        
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
        if (this.props.collaborateurs !== nextProps.collaborateurs) {            
            this.recalculerOptions(nextProps.collaborateurs)
        }
    }

    listeAyantsDroit() {
        // Récupérer la liste des ayant-droits        
        axios.get(`http://api.smartsplit.org:8080/v1/rightHolders`)
        .then(res=>{            
            let _adParId = {}
            let _options = res.data.map((elem, idx)=>{
                let nom = `${elem.firstName || ""} ${elem.lastName || ""} ${elem.artistName ? `(${elem.artistName})` : ""}`
                _adParId[elem.rightHolderId] = elem
                let avatar = ''                
                // Y a-t-il un avatar ?
                if(elem.avatarImage) 
                    avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${elem.avatarImage}`
                else
                    avatar = 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg'

                return (
                    {
                        key: this.state.nomCommeCle ? nom : elem.rightHolderId,
                        text: nom,
                        value: this.state.nomCommeCle ? nom : elem.rightHolderId,
                        image: { avatar: true, src: avatar }
                    }
                )
            })            
            if(!this.OPTIONS) {
                this.OPTIONS = _options                
            }
            this.setState({ayantDroit: _adParId}, ()=>{if(this.props.onRef) this.props.onRef(_adParId)})
            this.setState({options: _options}, ()=>{
                // recalcul des options initiales
                if(this.props.collaborateurs)
                    this.recalculerOptions(this.props.collaborateurs)
            })
        })
        .catch(err=>{
            toast.error(err)
        })
    }

    recalculerOptions(collaborateurs){
        // collaborateurs est une liste de collaborateurs à exclure
        let options = Object.assign([], this.OPTIONS)
        collaborateurs.forEach(elem => {
            options.forEach((_e, idx)=>{
                if (elem.nom === _e.text) {
                    options.splice(idx, 1)
                }
            })
        })
        this.setState({options: options})
    }

    handleAddition = (e, { value }) => {
        this.setState({ open:true })
        this.setState({ firstName: value })
    }

    render() {
        return(
            <div>
                {
                    this.state.options && (
                        <Wizard.Field                
                            name={this.state.modele}
                            component={Form.Dropdown}
                            componentProps={{
                                id: "collaborateur",
                                label: this.state.etiquette,
                                placeholder: this.state.indication,
                                required: this.state.requis,
                                autoFocus: this.state.autoFocus,
                                fluid: true,
                                search: true,
                                selection: this.state.selection,
                                multiple: this.state.multiple,
                                options: this.state.options,
                                onAddItem: this.handleAddition,
                                allowAdditions: this.state.ajout,
                                clearable: false
                            }}
                            
                        />
                    ) 
                }       
                <ModifyUser 
                    open={this.state.open} 
                    firstName={this.state.firstName}
                    close={()=>{
                        this.setState({open: false}, ()=>{
                            if(this.props.close) {
                                this.props.close()
                            }
                        })                        
                    }}
                    fn={()=>{
                        this.listeAyantsDroit()                    
                    }}
                    />  
            </div>
        )        
    }
}

export class ChampListeEditeurAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            fluid: props.fluid,
            multiple: props.multiple,
            recherche: props.recherche,
            selection: props.selection,
            ajout: props.ajout
        }
        this.OPTIONS = undefined
    }

    componentWillMount() {

        // Conserver la structure des éditeurs classé par nom (permet au parent de retrouver le rightHolderId correspondant au nom)
        let editeurs = {}

        // Récupérer la liste des ayant-droits (éditeurs)
        axios.get(`http://api.smartsplit.org:8080/v1/rightHolders`)
        .then(res=>{            
            let _options = res.data.map(elem=>{
                let nom = `${elem.artistName ? elem.artistName : `${elem.firstName} ${elem.lastName}`}`
                editeurs[nom] = elem.rightHolderId
                return {key: `${elem.rightHolderId}`,text: nom, value: nom}
            })            
            if(!this.OPTIONS) {
                this.OPTIONS = _options
            }
            this.setState({options: _options})
            this.props.parent.setEditeurs(editeurs) // Envoi du tableau associatif éditeur -> rightHolderId au parent
        })
        .catch(err=>{
            toast.error(err)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }      
    }

    render() {
        return(
            <div>
                {
                    this.state.options && (
                        <Wizard.Field                
                            name={this.state.modele}
                            component={Form.Dropdown}
                            componentProps={{
                                id: "collaborateur",
                                label: this.state.etiquette,
                                placeholder: this.state.indication,
                                required: this.state.requis,
                                autoFocus: this.state.autoFocus,
                                fluid: true,
                                search: true,
                                selection: this.state.selection,
                                multiple: this.state.multiple,
                                options: this.state.options,
                                allowAdditions: this.state.ajout,
                            }}
                            validate={this.state.requis && required}
                        />
                    )
                }                
            </div>
        )        
    }
}