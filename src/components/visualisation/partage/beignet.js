/** 
 * Assistant d'affichage du dashboard
 */
import './beignet.css'
import React, { Component } from 'react'

// Traduction
import { Translation } from 'react-i18next'

// D3
const d3 = require('d3')

export default class Beignet extends Component {

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
            width: 800, //550,
            height: 250, //225,
            margin: 0, //50,
            data: _d,
            colors: _c,
            uuid: props.uuid
        }        
    } 

    componentWillReceiveProps(nextProps) {
        // Le beignet rafraichit son affichage à chaque changement de propriétés.
        // Il n'y a pas de test sur les attributes (this.props.xyz !== nextProps.xyz)
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

    genererBeignet() {     
        // Remettre à zéro le conteneur du beignet
        let conteneur = document.getElementById(`my_dataviz_${this.state.uuid}`)
        if(conteneur) {
            let enfants = conteneur.childNodes
            enfants.forEach(_e=>{
                conteneur.removeChild(_e)
            })
        }

        // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
        let radius = Math.min(this.state.width, this.state.height) / 2 - this.state.margin

        // append the svg object to the div called 'my_dataviz'
        let svg = d3.select(`#my_dataviz_${this.state.uuid}`)
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height)
            .append("g")
            .attr("transform", "translate(" + this.state.width / 2 + "," + this.state.height / 2 + ")");

        //let color = d3.scaleOrdinal() // D3 Version 4
        //    .domain(domaineDeNoms)
        //    .range(["#EBB1DC", "#F6BCC7", "#FED2AC", "#F8EBA3", "#C6F3B6", "#AAE7E8", "#A4B7F1", "#BDBCF9"]);
        let color = d3.scaleOrdinal() // D3 Version 4
            .domain(Object.keys(this.state.colors))
            .range(Object.values(this.state.colors));

        // Compute the position of each group on the pie:
        let pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(function(d) {return d.value; })
        
        let data_ready = pie(d3.entries(this.state.data))

        // The arc generator
        let arc = d3.arc()
            .innerRadius(radius * 0.4)         // This is the size of the donut hole
            .outerRadius(radius * 0.95)

        // Another arc that won't be drawn. Just for labels positioning
        let outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        // Add the polylines between chart and labels:
        svg
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function(d) {
                let posA = arc.centroid(d) // line insertion in the slice
                let posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                let posC = outerArc.centroid(d); // Label position = almost the same as posB
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            })

        // Add the polylines between chart and labels:
        svg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
            .text( function(d) { return d.data.key + " " + parseFloat(d.data.value).toFixed(2) + "%" } )
            .attr('transform', function(d) {
        let pos = outerArc.centroid(d);
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })

    }

    render() {
        // Ajoute la génération de beignet comme prochaine exécution de la pile JavaScript
        // alors que l'élément my_dataviz est accessible dans le navigateur du client.
        setTimeout(()=>{
            this.genererBeignet()
        }, 0)

        return (
            <Translation>
                {
                    (t, i18n) =>
                        <div style={{margin: "0 auto"}}>
                            {this.props.titre && (<h4>{this.props.titre}</h4>)}
                            <div id={`my_dataviz_${this.state.uuid}`} className="beignet" >
                            </div>
                        </div>
                }
            </Translation>
        )
    }
}