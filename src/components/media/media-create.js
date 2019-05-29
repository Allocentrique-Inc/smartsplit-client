import React, { Component } from 'react'
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

// Modèle
import Media from '../../model/media/Media'

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
        donnees.publishedDate = moment.utc().format()
        donnees.publisher = 'Vincent de Grandpré'
        donnees.rightHolders = []
        donnees.rightsType = []
        donnees.split = []

        // Création d'un objet Media afin de valider le modèle
        const media = new Media(donnees)

        // Transmettre à l'API (configuration locale statique)
        const options = {
            method: 'POST',
            data: media.get(),
            headers: {
                "Content-Type": "application/json"
            }
        }

        console.log('fetch() avec options',options)

        fetch('http://localhost:8080/v1/media', options).then((response) => {
            return response.json()
        })
        .then((jsonObject) => {
            alert('Biquette est sortie du trou!')
            cb()
        })
        .catch((error) => {
            alert('Biquette veut pas sortir du trou...')
            throw(error)
        })
    }

    render() {
        return (
            <Formik
                initialValues={ {mediaId: 0, cover: false, title: 'Titre', album: 'Album', description: 'Description', jurisdiction: 'Juridiction', genre: 'Genre'} }
                onSubmit={
                    (values, { setSubmitting }) => {
                        // Soumettre les valeurs à l'API
                        this.creerMedia(values, ()=>{setSubmitting(false)})
                }}
                validationSchema={
                    Yup.object().shape({
                        title: Yup.string().required('Required'),
                        album: Yup.string().required('Required'),
                        description: Yup.string().required('Required'),
                        jurisdiction: Yup.string().required('Required'),
                        genre: Yup.string().required('Required'),                        
                        cover: Yup.boolean().required('Required')                        
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
                    <label htmlFor="title" style={{ display: 'block' }}>Titre</label>                    
                    <input
                        id="title"
                        placeholder="Titre de l'oeuvre"
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
                    <label htmlFor="album" style={{ display: 'block' }}>Album</label>                    
                    <input
                        id="album"
                        placeholder="Titre de l'album"
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
                    <label htmlFor="description" style={{ display: 'block' }}>Description</label>                    
                    <input
                        id="description"
                        placeholder="Description"
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                        errors.description && touched.description ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.description && touched.description && (
                        <div className="input-feedback">{errors.description}</div>
                    )}
                    <label htmlFor="jurisdiction" style={{ display: 'block' }}>Juridiction</label>                    
                    <input
                        id="jurisdiction"
                        placeholder="Juridiction"
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
                    <label htmlFor="genre" style={{ display: 'block' }}>Genre musical</label>                    
                    <input
                        id="genre"
                        placeholder="Genre musical"
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
                    <label htmlFor="cover" style={{ display: 'block' }}>Cover</label>
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
                        Reset
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
              )
            }}
          </Formik>
          )
    }
}