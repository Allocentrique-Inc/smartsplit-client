import './histogramme.css'
import React, { Component } from 'react'

const d3 = require('d3')
const WIDTH_FUDGE_PCT = 0.5 // Largeur ajustée en pourcentage 

export default class Histogramme extends Component {

    constructor(props){
        super(props)
        
        let _d = {}
        let _c = {}
        
        if(props.data.length > 0) {
            props.data.forEach(elem=>{
                if(elem && elem.pourcent !== 0) {
                    _d[elem.nom] = elem.pourcent
                }
            })
        }
        this.state = {
            dataset: Object.keys(this.props.data).map(elem=>this.props.data[elem].pourcent),
            nameset: Object.keys(this.props.data).map(elem=>this.props.data[elem].nom),
            uuid: this.props.uuid,
            data: _d,
            colors: _c
        }        
    }   

    componentWillReceiveProps(nextProps) {
        // L'histogramme' rafraichit son affichage à chaque changement de propriétés.
        // Il n'y a pas de test sur les attributes (this.props.xyz !== nextProps.xyz)
        this.setState({dataset: Object.keys(nextProps.data).map(elem=>nextProps.data[elem].pourcent)},
        ()=>{
            this.setState({nameset: Object.keys(nextProps.data).map(elem=>nextProps.data[elem].nom)},
            ()=>{
                this.genererHisto()
            })
        })
        let _d = {}
        let _c = {}
        if(nextProps.data.length > 0) {
            nextProps.data.forEach(elem=>{
                if(elem && parseFloat(elem.pourcent).toFixed(4) !== "0.0000") {
                    _d[elem.nom] = elem.pourcent
                }
                _c[elem.nom] = elem.color
            })
            this.setState({data: _d})
            this.setState({colors: _c})
        } 
    }

    genererHisto() {

        // Remettre à zéro le conteneur de l'histogramme
        let conteneur = document.getElementById(`histogramme_${this.state.uuid}`)
        if(conteneur) {
            let enfants = conteneur.childNodes
            enfants.forEach(_e=>{
                conteneur.removeChild(_e)
            })
        }

        var dataset = this.state.dataset
        var nameset = this.state.nameset

        var margin = {top: 50, right: 40, bottom: 50, left: 100}
        var width = (800 - 20 - margin.left - margin.right) * WIDTH_FUDGE_PCT // Use the window's width 
        var height = 300 - 20 - margin.top - margin.bottom // Use the window's height
        
        var svg = d3.select(`#histogramme_${this.state.uuid}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
        //var colors = d3.scaleOrdinal(d3.schemePaired)
        let colors = d3.scaleOrdinal() // D3 Version 4
            .domain(Object.keys(this.state.colors))
            .range(Object.values(this.state.colors));

        var xScale = d3.scaleLinear()
            .domain([0, dataset.length - 1])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(d3.values(dataset))])
            .range([height, 0]);

        var barPadding = 7.2
        var barWidth = (width / dataset.length);        

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")	
            .text(function(d) { return d + " %"; })
            .style("font", "16px arial")

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(35," + height + ")")
            .call(d3.axisBottom(xScale).ticks(8))
        .selectAll("text")	
            .text(function(d, i) { return nameset[i]; })
            .style("text-anchor", "start")
            .style("font", "16px arial")
            .attr("dx", ".75em")
            .attr("dy", ".75em")
            .attr("transform", "rotate(45)")

        svg.selectAll("rect")  
            .data(dataset)  
            .enter()  
            .append("rect")
            .style("fill", function(d,i){return colors(i)})
            .attr("y", function(d) {  
                return height - d * 21 
            })  
            .attr("height", function(d) {  
                return d * 21;  
            })  
            .attr("width", barWidth - barPadding)  
            .attr("transform", function (d, i) {  
                var translate = [5 + (barWidth + barPadding) * i, 0]
                return "translate("+ translate +")"
            })

    }

    render(){        
        // Ajoute la génération de beignet comme prochaine exécution de la pile JavaScript
        // alors que l'élément my_dataviz est accessible dans le navigateur du client.
        setTimeout(()=>{
            this.genererHisto()
        }, 0)
        return (
            <svg id={`histogramme_${this.state.uuid}`} />
        )
    }
}