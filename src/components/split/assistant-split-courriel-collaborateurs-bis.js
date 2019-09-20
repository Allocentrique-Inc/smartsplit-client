/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component, Fragment } from "react"
import { Translation } from 'react-i18next'
import { Button, Header, Image, Modal, Checkbox, Dropdown, Input, Label} from 'semantic-ui-react'
import ValiderSplit from './assistant-split'
import { ChampCourrielAssistant } from "../formulaires/champ-texte"

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
            ayantDroits: {}
        }
    }

  closeModal = () => this.setState({ open: false })
  openModal = () => this.setState({ open: true })

  click(){
    this.handleSubmit();
    this.close();
  }
    

    render() {
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

                <Modal 
                  open={this.state.open}
                  closeOnDimmerClick={this.closeModal}
                  onClose={this.closeModal} 
                  size="small"
                >

                        <h1>{t('flot.split.valider.titre')}</h1>
                        <h2>{this.state.titre}</h2>
                        <p/>
                        <p/>
                        <h3>{t('flot.split.valider.soustitre')}</h3>

                       

                      <ValiderSplit proposition={this.props.id} />

                </Modal>   

              </React.Fragment>
            }
            </Translation>
             
        )
    }
}

export default PageAssistantSplitCourrielsCollaborateurs