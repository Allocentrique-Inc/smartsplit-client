/**
 * Saisie du titre et de l'image de l'oeuvre.
 * 
 * Cet écran apparaît sans progression au-dessus.
 */

import React from "react"
import { FormField } from "semantic-ui-react-ext"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'

// Traduction
import { Translation } from 'react-i18next';

// Image de méditation
import image from '../../assets/images/meditation-ecouteurs-femme.jpg'

import Dropzone from 'react-dropzone'

const Page = (props) => (
  <React.Fragment>
    <Translation>
      {
        (t) =>
          <table>
          <tbody>
            <tr>
              <td>
                <div>
                  {t('flot.documente-ton-oeuvre.preambule')}
                </div>

                <h1>
                  {t('flot.documente-ton-oeuvre.titre')}
                </h1>

                <Wizard.Field
                  name="oeuvre.titre"
                  component={FormField}
                  componentProps={{
                    label: t('oeuvre.attribut.etiquette.titre'),
                    placeholder: t('oeuvre.attribut.indication.titre'),
                    required: true,
                    autoFocus: true
                  }}
                  validate={required}
                />

                <h2>{t('composant.televersement.titre')}</h2>

                <p>
                  {t('composant.televersement.preambule')}
                </p>

                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className="drop-zone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>{t('composant.televersement.indication')}</p>
                            </div>
                        </section>
                    )}
                </Dropzone>

              </td>
              <td>
                <img src={image} alt={t('image.embarquement.alt')} />
              </td>
            </tr>
          </tbody>      
        </table>
      }      
    </Translation>    
  </React.Fragment>
)

export default Page