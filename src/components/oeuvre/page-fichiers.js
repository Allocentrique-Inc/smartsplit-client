import React from 'react';
import { Translation } from "react-i18next";
import Page from '../page-assistant/page';
import { ChampDate } from "../page-assistant/champ-date";
import FileCircleOrange from '../../assets/svg/icons/file-circle-orange.svg';
import FileCircleGreen from '../../assets/svg/icons/file-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import ChampTeleversement from "../page-assistant/champ-televersement";

export default class PageFichiers extends React.Component {

    icon() {
        return this.props.pochette ? FileCircleOrange : FileCircleGreen;
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <Page
                            pochette={ this.props.pochette }
                        >
                            <Colonne>
                                <Entete
                                    pochette={ this.props.pochette }
                                    icon={ this.icon() }
                                    label={ 'Fichiers' }
                                    question={ 'Quels fichiers veux-tu rendre accessible?' }
                                    description={ 'Ici, tu peux ajouter tous les fichiers relatifs à cette pièce musicale.' }
                                />

                                <div className="entete-section">
                                    <h3 className="section-title with-description">Visuel de l'œuvre</h3>

                                    <p className="description">
                                        Comme l’album a sa pochette, une chanson ou une pièce instrumentale doit aussi
                                        avoir
                                        un visuel pour la représenter. <br/>
                                        <a href="#">En savoir plus</a>
                                    </p>
                                </div>

                                <ChampTeleversement
                                    label={ 'Téléverser en format JPEG ou PNG' }
                                    undertext={ 'Recommandé : Image carrée de 1600 x 1600 pixels d’une résolution de 300 dpi.' }
                                    file={ this.props.values.files.cover.file }
                                    access={ this.props.values.files.cover.access || 'public' }
                                    onFileChange={ value => this.props.setFieldValue('files.cover.file', value) }
                                    onAccessChange={ value => this.props.setFieldValue('files.cover.access', value) }
                                />

                                <div className={ 'section-divider' }></div>

                                <div className="entete-section">
                                    <h3 className="section-title with-description">Fichier audio</h3>

                                    <p className="description">
                                        Ici, tu peux télécharger ta pièce en format WAV ou MP3.
                                    </p>
                                </div>

                                <ChampTeleversement
                                    label={ 'Téléverser le fichier de l’œuvre enregistrée' }
                                    undertext={ 'MP3 ou WAV acceptés.' }
                                    access={ this.props.values.files.audio.access || 'on-invite' }
                                    onFileChange={ value => this.props.setFieldValue('files.audio.file', value) }
                                    onAccessChange={ value => this.props.setFieldValue('files.audio.access', value) }
                                />

                                <div className={ 'section-divider' }></div>

                                <div className="entete-section">
                                    <h3 className="section-title with-description">Autres fichiers sur l’œuvre</h3>

                                    <p className="description">
                                        Ici, tu peux ajouter des documents permettant l’interprétation de l’œuvre, comme
                                        la partition ou le fichier MIDI.
                                    </p>
                                </div>

                                <ChampTeleversement
                                    label={ 'Partition ou tablature' }
                                    undertext={ 'Fichiers acceptés à mettre' }
                                    access={ this.props.values.files.score.access || 'on-invite' }
                                    onFileChange={ value => this.props.setFieldValue('files.score.file', value) }
                                    onAccessChange={ value => this.props.setFieldValue('files.score.access', value) }
                                />

                                <ChampTeleversement
                                    label={ 'Fichiers MIDI' }
                                    undertext={ 'Fichiers acceptés à mettre' }
                                    access={ this.props.values.files.midi.access || 'on-invite' }
                                    onFileChange={ value => this.props.setFieldValue('files.midi.file', value) }
                                    onAccessChange={ value => this.props.setFieldValue('files.midi.access', value) }
                                />
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
