/**
 * Saisie du titre de l'oeuvre
 */

import React from "react"
import { Button, Icon } from 'semantic-ui-react'
import { FormField } from "semantic-ui-react-ext"
import { Wizard } from "semantic-ui-react-formik"
import { required } from './utils'

import Dropzone from 'react-dropzone'

let dropZone = (
    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
            <section>
                <div className="drop-zone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Glissez et déposez des fichiers ici pour les envoyer, ou cliquez ici pour choisir et envoyer.</p>
                </div>
            </section>
        )}
    </Dropzone>
)

const Page = (props) => (
  <React.Fragment>

    <div>
      Bonjour Joe ! Nous allons t'aider à documenter ton oeuvre.
    </div>

    <h1>
      ÉTAPE 1
    </h1>

    <Wizard.Field
      name="oeuvre.titre"
      component={FormField}
      componentProps={{
        label: "Quel est le titre de ta pièce musicale ?",
        placeholder: "Titre de l'oeuvre",
        required: true,
        autoFocus: true
      }}
      validate={required}
    />

    <h2>Téléversez vos fichiers sources</h2>

    <p>
        Lorem ipsium, ici vous pouvez téléverser vos fichiers sources. 
        Ces fichiers seront accessibles seulement aux tierces personnes qui en possèdent les accès privés. 
        Vous pourrez ainsi partager vos fichiers directement aux radios, télédiffuseurs, etc.  
        Ce ne sont pas des liens pour le public.
    </p>

    {dropZone}

    <p/>

    <Button icon labelPosition='left' onClick={props.previous}>
      <Icon name='undo' />
      Recommencer
    </Button>
  </React.Fragment>
)

export default Page