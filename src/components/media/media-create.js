import React, { Component } from 'react'
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

// Traduction
import { Translation } from 'react-i18next';

// Modèle
import Oeuvre from '../../model/oeuvre/oeuvre'

// CSS
import ('./media.css')

export default class MediaCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    creerMedia(donnees, cb) {

        // Ajuster les données reçues du formulaire: 
        // creationDate, modificationDate, submissionDate, publisher, rightHolders, rightsType, split        
        donnees.creationDate = moment.utc().format()
        donnees.modificationDate = moment.utc().format()
        donnees.publishDate = moment.utc().format()
        donnees.publisher = 'Vincent de Grandpré'
        donnees.rightHolders = {}
        donnees.rightsType = {}
        donnees.rightsSplit = {}

        // Ajout données         
        donnees.secondaryGenre = 'Genre secondaire - test'
        donnees.lyrics = 'Paroles - test'
        donnees.isrc = 'ISRC - test'
        donnees.upc = 'UPC - test'
        donnees.msDuration = "1234"
        donnees.inLanguages = ['Mandarin', 'Instrumental']
        donnees.socialMediaLinks = {facebook: "https://facebook.com/ex", twitter: "https://twitter.com/ex", youtube: "https://youtube.com/ex"}
        donnees.streamingServiceLinks = {spotify: "https://open.spotify.com/track/asdgj4qhfasd", apple: "https://twitter.com/ex"}
        donnees.pressArticleLinks = {medium: "https://medium.com/ex", metro: "https://metro.ca/ex"}
        donnees.playlistLinks = {spotify: "https://open.spotify.com/playlist/37i9dQZEVXbKfIuOAZrk7G", youtube: "https://www.youtube.com/playlist?list=PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx"}

        // Création d'un objet Media afin de valider le modèle
        const media = new Oeuvre(donnees)

        // Transmettre à l'API (configuration locale statique)
        const options = {
            method: 'POST',
            mode: 'no-cors', // TODO Remove patch
            body: media.get(),
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000",
                "Accept": "application/json"
            }
        }

        console.log('fetch() avec options',options)

        fetch('http://api.smartsplit.org:8080/v1/media', options).then((response) => {
            return response.json()
        })
        .then((jsonObject) => {            
            cb()
        })
        .catch((error) => {
            throw(error)
        })
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <Formik
                            initialValues={ 
                                    {
                                        mediaId: 0, 
                                        cover: false, 
                                    } 
                                }
                            onSubmit={
                                (values, { setSubmitting }) => {
                                    // Soumettre les valeurs à l'API
                                    this.creerMedia(values, ()=>{setSubmitting(false)})
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    title: Yup.string().required(t('validation.requis')),
                                    album: Yup.string().required(t('validation.requis')),
                                    artist: Yup.string().required(t('validation.requis')),
                                    jurisdiction: Yup.string().required(t('validation.requis')),
                                    genre: Yup.string().required(t('validation.requis')),                        
                                    cover: Yup.boolean().required(t('validation.requis'))                        
                                })
                            }
                        >
                        {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props
                        return (
                            <form onSubmit={handleSubmit}>                    
                                <label htmlFor="title" style={{ display: 'block' }}>{t('oeuvre.attribut.etiquette.titre')}</label>
                                <input
                                    id="title"
                                    placeholder={t('oeuvre.attribut.indication.titre')}
                                    type="text"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.title && touched.title ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.title && touched.title && (
                                    <div className="input-feedback">{errors.title}</div>
                                )}
                                <label htmlFor="album" style={{ display: 'block' }}>{t('oeuvre.attribut.etiquette.album')}</label>                    
                                <input
                                    id="album"
                                    placeholder={t('oeuvre.attribut.indication.album')}
                                    type="text"
                                    value={values.album}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.album && touched.album ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.album && touched.album && (
                                    <div className="input-feedback">{errors.album}</div>
                                )}
                                <label htmlFor="artist" style={{ display: 'block' }}>{t('oeuvre.attribut.etiquette.artiste')}</label>
                                <input
                                    id="artist"
                                    placeholder={t('oeuvre.attribut.indication.artiste')}
                                    type="text"
                                    value={values.artist}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.artist && touched.artist ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.artist && touched.artist && (
                                    <div className="input-feedback">{errors.artist}</div>
                                )}
                                <label htmlFor="jurisdiction" style={{ display: 'block' }}>{t('oeuvre.attribut.etiquette.juridiction')}</label>
                                <input
                                    id="jurisdiction"
                                    placeholder={t('oeuvre.attribut.indication.juridiction')}
                                    type="text"
                                    value={values.jurisdiction}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.jurisdiction && touched.jurisdiction ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.jurisdiction && touched.jurisdiction && (
                                    <div className="input-feedback">{errors.jurisdiction}</div>
                                )}
                                <label htmlFor="genre" style={{ display: 'block' }}>{t('oeuvre.attribut.etiquette.genre')}</label>
                                <input
                                    id="genre"
                                    placeholder={t('oeuvre.attribut.indication.genre')}
                                    type="text"
                                    value={values.genre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.genre && touched.genre ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.genre && touched.genre && (
                                    <div className="input-feedback">{errors.genre}</div>
                                )}
                                <label htmlFor="cover" style={{ display: 'block' }}>{t('oeuvre.attribut.etiquette.reprise')}</label>
                                <input
                                    id="cover"
                                    type="checkbox"
                                    value={values.cover}
                                    onChange={handleChange}
                                    onBlur={handleBlur}                        
                                />
                                
                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    {t('navigation.reinitialiser')}
                                </button>
                                <button type="submit" disabled={isSubmitting}>
                                    {t('navigation.soumettre')}
                                </button>
                            </form>
                        )
                        }}
                    </Formik>
                }    
            </Translation>            
          )
    }
}