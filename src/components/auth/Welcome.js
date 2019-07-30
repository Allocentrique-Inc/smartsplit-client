import React from 'react';
import { Translation } from 'react-i18next'

const Welcome = () => (
  
    <Translation>
      {
        (t) =>
        <section className="section auth">
         <div className="container">
            <h2>{t('auth.bienvenue.titre')}</h2>
            <p>
              {t('auth.bienvenue.preambule')}
            </p>
            <p>
              {t('auth.bienvenue.indication')}
            </p>
         </div>
      </section>
      }      
    </Translation>    
)

export default Welcome
