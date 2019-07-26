import React from 'react';
import { Translation } from 'react-i18next'

const ChangePasswordVerification = () => (
  
  // <React.Fragment>
    <Translation>
      {
        (t) =>
        <section className="section auth">
         <div className="container">
          <tbody>
            <tr>
              <td>
                <h2>{t('auth.passwordchanged.titre')}</h2>

                <p>
                  {t('auth.passwordchanged.indication')}
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

export default ChangePasswordVerification