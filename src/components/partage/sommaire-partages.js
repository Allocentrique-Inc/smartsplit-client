// Résumé du partage - US 64

import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { Translation } from 'react-i18next'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

import Entete from '../entete/entete'
import { Accordion, Icon } from 'semantic-ui-react'
import SommairePartage from './partage-sommaire'
import moment from 'moment'

const localeFr = () => {moment.locale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
    }
})}

export default class SommairePartages extends Component {

    constructor(props){
        super(props)
        this.state = {
            mediaId: props.mediaId,
            activeIndex: 0
        }
        this.initialisation = this.initialisation.bind(this)
        this.clic = this.clic.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.i18n !== nextProps.i18n) {
            if(nextProps.i18n.lng === "fr") {
                // momentjs en français, SVP
                localeFr()
            }            
        }
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
            this.initialisation()
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: `Connexion obligatoire`,
                message: `Tu dois être connecté pour accéder`,
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <div>
                        <Login message="Connecte-toi pour accéder" fn={(user)=>{
                            onClose()
                            this.setState({user: user}, ()=>{
                                this.initialisation()
                            })
                        }} />
                </div>
            })
        })        
    }

    initialisation() {
        axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
        .then(res=>{
            this.setState({media: res.data.Item}, ()=>{
                axios.get(`http://api.smartsplit.org:8080/v1/proposal/media/${this.state.mediaId}`)
                .then(res=>{
                    this.setState({propositions: res.data})
                    this.setState({activeIndex: res.data.length - 1})
                })
            })
        })
    }

    clic = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
      }

    render() {        
        
        if(this.state.propositions && this.state.media) {

            let propositions = []
            let contenu = (
                <Translation>
                    {
                        t =>
                            <div className="ui ten wide column">
                                <i className="file image outline icon huge grey"></i>
                                    {this.state.media && (<span style={{marginLeft: "15px"}} className="medium-400">{this.state.media.title}</span>)}
                                    <span className="heading4" style={{marginLeft: "50px"}}>{t('flot.etape.partage-titre')}</span>                            
                            </div>
                    }                    
                </Translation>
            )
        
            propositions = this.state.propositions.map((elem, idx)=>{ 
                return(                    
                    <Translation key={`sommaire_${idx}`} >
                        {
                            (t) =>                            
                                <div className="ui row">
                                    <Accordion.Title active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                                        <Icon name='dropdown' />
                                        Version {idx + 1} - {elem.state ? elem.state : "INCONNU"}
                                        <div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;{t('oeuvre.creePar')}&nbsp;</div>
                                            <div className="small-500-color" style={{display: "inline-block"}}>{`${elem.initiator.name}`}</div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;{elem._d ? moment(elem._d).fromNow() : moment().fromNow()}</div>
                                        </div>
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeIndex === idx}>
                                        <SommairePartage uuid={elem.uuid} />
                                    </Accordion.Content>                                
                                </div>
                        }
                    </Translation>
                )
            })

            propositions = propositions.reverse()

            return (
                <div className="ui segment">                    
                    <div className="ui grid" style={{padding: "10px"}}>
                        <div className="ui row">
                            <Entete navigation={`/oeuvre/sommaire/${this.state.media.mediaId}`} contenu={contenu} profil={this.state.user} />
                        </div>
                        <div className="ui row">
                            <div className="ui one wide column">
                            </div>
                            <Accordion fluid styled className="ui twelve wide column">
                                {propositions}
                            </Accordion>                            
                            <div className="ui one wide column">
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

}