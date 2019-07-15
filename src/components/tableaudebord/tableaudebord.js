import React, {Component} from 'react'

// Composantes
import Navigation from './tableaudebord-navigation'
import Panneau from './tableaudebord-panneau'

// CSS
import './tableaudebord.css'

export default class TableauDeBord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: 0
        }
    }

    render() {
        return (
            <div className="tdb--cadre">
                <Navigation parent={this} />
                <Panneau selection={this.state.navigation} />
            </div>
        )
    }

}