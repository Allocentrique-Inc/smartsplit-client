import React, {Component} from 'react'

// Composantes
import Beignet from './beignet'
import Histogramme from './histogramme'

// CSS
import './beignet.css'
import './histogramme.css'

export default class Troissplits extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: 0,
            data1: {
                "Guillaume": 60,
                "Vincent": 20,
                "Mario": 20
            },
            data2: {
                "Guillaume": 60,
                "Natalya": 10,
                "David": 10,
                "Vincent": 10,
                "Mario": 10
            },
            data3: {
                "Guillaume": 10,
                "Vincent": 10,
                "Mario": 10,
                "Toto Records": 70
            },
            data4: { 
                "Guillaume": 30, 
                "Natalya": 22, 
                "David": 15, 
                "Vincent": 10, 
                "Georges": 9, 
                "Mario": 5, 
                "Steve": 3.2, 
                "Fabien": 3.1, 
                "Erika": 2.7, 
                "Danielle": 2.7, 
                "Jean-François": 2.5, 
                "Martine": 2.2, 
                "France": 1.9, 
                "Maxime": 1.7, 
                "François-Simon": 1.6, 
                "Jonathan": 1.5, 
                "Julien": 1.3, 
                "Thomas": 1, 
                "Louis-Pierre": 1
            }
        }
    }

    render() {
        return (
            <div className="tdb--cadre">
                <Beignet uuid={1} parent={this} data={this.state.data1}/>
                <Beignet uuid={2} parent={this} data={this.state.data2}/>
                <Beignet uuid={3} parent={this} data={this.state.data3}/>
            </div>
        )
    }

}