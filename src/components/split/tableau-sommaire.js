import React, {Component} from 'react'

const DROITS = {
    auteur: 'workCopyrightSplit', 
    interpretaion: 'performanceNeighboringRightSplit', 
    enregistrement: 'masterNeighboringRightSplit'
}

class TableauSommaireSplit extends Component {

    constructor(props){
        super(props)
        this.state = {
            droits: props.droits
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.droits !== nextProps.droits) {
            this.setState({droits: nextProps.droits})
        }
    }

    render() {

        let droitAuteur, droitInterpretation, droitEnregistrement
        let tableau = []

        droitAuteur = []
        droitInterpretation = []
        droitEnregistrement = []

        if(this.state.droits) {
            Object.keys(this.state.droits[DROITS.auteur]).forEach((elem) => {
                let _e = this.state.droits[DROITS.auteur][elem]
                droitAuteur.push(`${_e.rightHolder.name} : ${_e.splitPct}%`)
            })
    
            Object.keys(this.state.droits[DROITS.interpretaion]).forEach((elem) => {
                let _e = this.state.droits[DROITS.interpretaion][elem]
                droitInterpretation.push(`${_e.rightHolder.name} : ${_e.splitPct}%`)
            })
    
            Object.keys(this.state.droits[DROITS.enregistrement]).forEach((elem) => {
                let _e = this.state.droits[DROITS.enregistrement][elem]
                droitEnregistrement.push(`${_e.rightHolder.name} : ${_e.splitPct}%`)
            })
    
            let tailleMax = Math.max(droitAuteur.length, droitInterpretation.length, droitEnregistrement.length)        
                
            for(let i = 0; i < tailleMax; i++) {
                tableau.push(
                    <tr key={`tableau--rang--${i}`}>
                        <td>{droitAuteur[i]}</td>
                        <td>{droitInterpretation[i]}</td>
                        <td>{droitEnregistrement[i]}</td>
                    </tr>
                )
            }
        }        

        return (
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th><i className="copyright outline icon huge"></i></th>
                        <th><i className="star outline icon huge"></i></th>
                        <th><i className="product hunt icon huge"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {tableau}
                </tbody>
            </table>
        )
    }
}

export default TableauSommaireSplit