/**
 * Test unitaire de la création de média
 * 
 * Vérifie :
 * 
 *  - Créé objet Media du modèle valide
 *      o La structure du modèle est bonne
 *      o La somme des pourcentages de split est de 100 % (réf. exigence non-fonctionnelle 10. Robustesse)
 *      o Les informations passées au constructeur sont présentes dans l'objet
 *      o Les dates sont en format UTC
 *  - Ne créé pas un objet Media du modèle invalide
 *      o Cas : une structure valide et un pourcentage total des split non égal à 100%
 */

import {assert, expect} from 'chai'
import {MediaOracle} from  './media_test-oracle'

import Media from '../../model/media/Media'

let SUJET_TEST

describe('Création de média', ()=>{
    it(`Accepte la construction d'un média valide`, ()=>{
        SUJET_TEST = new Media(MediaOracle.MEDIA_STRUCTURE_VALIDE())        
    })
    it(`Refuse la construction d'un média invalide`, ()=>{

    })
})