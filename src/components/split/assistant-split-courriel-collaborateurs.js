/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component, Fragment } from "react"
import { Translation } from 'react-i18next'

import { Button } from 'semantic-ui-react'

import { ChampCourrielAssistant } from "../formulaires/champ-texte"
import Axios from "axios";
 
const divEmail = {
    position: 'relative',
    display: 'block',
    margin: '0 auto',
    width: '464px',
  };

class PageAssistantSplitCourrielsCollaborateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            ayantDroits: props.ayantDroits
        }
    }

    componentWillMount(){
      let _aDs = this.props.ayantDroits
      let cpt = 0, taille = Object.keys(this.props.ayantDroits).length, aTous = false
      Object.keys(this.props.ayantDroits).forEach(rhId=>{
        Axios.get(`http://api.smartsplit.org:8080/v1/rightholders/${rhId}` )
        .then( (res)=>{
          let _aD = res.data.Item
          console.log(_aD)
          _aDs[rhId] = _aD
          cpt = cpt + 1
          if(cpt >= taille) {
            this.setState({ayantDroits: _aDs}, ()=>{console.log(this.state.ayantDroits)})
          }
        }

        )
      })
    }


  closeModal = () => this.setState({ open: false })
  openModal = () => this.setState({ open: true })

  click(){
    this.handleSubmit();
    this.close();
  }
    

    render() {


      // Construction de la liste à afficher
      let ayantDroits = []
      Object.keys(this.state.ayantDroits).forEach((elem)=>{

        console.log(this.state.ayantDroits[elem])

          ayantDroits.push( 
              (
                  <ChampCourrielAssistant 
                      style={divEmail}
                      key={`champ--courriel__split-${elem}`} 
                      modele={this.state.ayantDroits[elem].email} 
                      requis={true} etiquette={this.state.ayantDroits[elem].name} 
                      indication="courriel@domain.extension"
                  />
                  
              )
          )
      })

        return (
          <Translation>
             { 
            (t) =>
              <React.Fragment>
                <Button onClick={this.openModal}>
                  <div className={`ui medium button`} style={{width:"200px", right:"150px"}}>
                    {t('flot.proposition.envoyer')}
                  </div>
                </Button>
                {ayantDroits}

              </React.Fragment>
            }
            </Translation>
             
        )
    }
}

export default PageAssistantSplitCourrielsCollaborateurs