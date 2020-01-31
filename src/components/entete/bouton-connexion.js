import React, {Component} from 'react'
import { withTranslation } from 'react-i18next'

class BoutonConnexion extends Component {    

    constructor(props) {
      super(props)
      this.state = {
        user: '',
        initials: ''
      }
    }

    render() {
        const t = this.props.t
        return (            
            <div className="ui medium button">
                {t('entete.connexion')}
            </div>                
        )
    }
}
export default withTranslation()(BoutonConnexion)