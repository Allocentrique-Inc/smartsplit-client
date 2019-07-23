import React from 'react';
import { Translation } from 'react-i18next'

const Welcome = () => (
  
  // <React.Fragment>
    <Translation>
      {
        (t) =>
        <section className="section auth">
         <div className="container">
          <tbody>
            <tr>
              <td>
                <h2>{t('auth.bienvenue.titre')}</h2>

                <p>
                  {t('auth.bienvenue.preambule')}
                </p>

                <p>
                  {t('auth.bienvenue.indication')}
                </p>

              </td>
            </tr>
          </tbody>    
         </div>
      </section>
      }      
    </Translation>    
  // </React.Fragment>
)

export default Welcome
