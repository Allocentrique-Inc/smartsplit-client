import React, { Component } from "react"
import { withTranslation } from 'react-i18next'
import { ChampTexteAssistant } from "../formulaires/champ-texte"
import { Progress } from 'semantic-ui-react'
import { FieldArray } from 'formik'

class PageAssistantOeuvreLiens extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            pctProgression: props.pctProgression
        }
    }
    
    render(){
        const t = this.props.t
        return (            
            <React.Fragment>
                <Progress percent={this.state.pctProgression} indicating></Progress>                                                

                <div className="fields">
                    <div className="four wide field">
                        <h2>{t('flot.lien.sociaux.titre')}</h2>

                        <FieldArray
                            name="socialMediaLinks"
                            render={arrayHelpers => (
                                <div>
                                    {
                                        this.props.values.socialMediaLinks.map((lien, index)=>(
                                            <div key={`lien-social-${index}`}>
                                                <div className="fields">
                                                    <div className="field">
                                                        <button
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                            <i className="remove icon"></i>
                                                        </button>
                                                    </div>
                                                    <div className="twelve wide field">
                                                        <ChampTexteAssistant 
                                                            etiquette={t('oeuvre.attribut.etiquette.liensSociaux')} indication={t('oeuvre.attribut.indication.liensSociaux')} 
                                                                requis={false} autoFocus={true} />
                                                    </div>                                                            
                                                </div>                                                                                                                                                    
                                            </div>
                                        ))
                                    }
                                    <button
                                        type="button"                                                
                                        onClick={() => arrayHelpers.insert()}
                                    >
                                        <i className="plus circle icon big"></i>
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                    <div className="four wide field">
                        <h2>{t('flot.lien.commercial.titre')}</h2>
                        <FieldArray
                            name="streamingServiceLinks"
                            render={arrayHelpers => (
                                <div>
                                    {
                                        this.props.values.streamingServiceLinks.map((lien, index)=>(
                                            <div key={`lien-streaming-${index}`}>
                                                <div className="fields">
                                                    <div className="field">
                                                        <button
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                            <i className="remove icon"></i>
                                                        </button>
                                                    </div>
                                                    <div className="nine wide field">
                                                        <ChampTexteAssistant 
                                                            etiquette={t('oeuvre.attribut.etiquette.liensServices')} indication={t('oeuvre.attribut.indication.liensServices')} 
                                                            modele={`streamingServiceLinks[${index}].lien`} requis={false} autoFocus={true} lien={lien && lien.lien} typeLien={lien && lien.type}/>
                                                    </div>                                                                
                                                </div>                                                                                                                                                    
                                            </div>
                                        ))
                                    }
                                    <button
                                        type="button"                                                
                                        onClick={() => arrayHelpers.insert()}
                                    >
                                        <i className="plus circle icon big"></i>
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                    <div className="four wide field">
                        <h2>{t('flot.lien.presse.titre')}</h2>
                        <FieldArray
                            name="pressArticleLinks"
                            render={arrayHelpers => (
                                <div>
                                    {
                                        this.props.values.pressArticleLinks.map((lien, index)=>(
                                            <div key={`lien-presse-${index}`}>
                                                <div className="fields">
                                                    <div className="field">
                                                        <button
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                            <i className="remove icon"></i>
                                                        </button>
                                                    </div>
                                                    <div className="twelve wide field">
                                                        <ChampTexteAssistant 
                                                            etiquette={t('oeuvre.attribut.etiquette.liensPresse')} indication={t('oeuvre.attribut.indication.liensPresse')} 
                                                            modele={`pressArticleLinks[${index}].lien`} requis={false} autoFocus={true} />
                                                    </div>                                                            
                                                </div>                                                                                                                                                    
                                            </div>
                                        ))
                                    }
                                    <button
                                        type="button"                                                
                                        onClick={() => arrayHelpers.insert()}
                                    >
                                        <i className="plus circle icon big"></i>
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                    <div className="four wide field">
                        <h2>{t('flot.lien.liste.titre')}</h2>
                        <FieldArray
                            name="playlistLinks"
                            render={arrayHelpers => (
                                <div>
                                    {
                                        this.props.values.playlistLinks.map((lien, index)=>(
                                            <div key={`lien-liste-${index}`}>
                                                <div className="fields">
                                                    <div className="field">
                                                        <button
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                            <i className="remove icon"></i>
                                                        </button>
                                                    </div>
                                                    <div className="twelve wide field">
                                                        <ChampTexteAssistant 
                                                            etiquette={t('oeuvre.attribut.etiquette.liensListes')} indication={t('oeuvre.attribut.indication.liensListes')} 
                                                            modele={`playlistLinks[${index}].lien`} requis={false} autoFocus={true} />
                                                    </div>                                                            
                                                </div>                                                                                                                                                    
                                            </div>
                                        ))
                                    }
                                    <button
                                        type="button"                                                
                                        onClick={() => arrayHelpers.insert()}
                                    >
                                        <i className="plus circle icon big"></i>
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withTranslation()(PageAssistantOeuvreLiens)