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
        this.state = {
            width: 450,
            height: 450,
            margin: 125,
            data: props.data,
            uuid: props.key
        }

        //this.genererBeignet = this.genererBeignet.bind(this)
    } 

    genererBeignet() {           

        // Remettre à zéro le conteneur du beignet
        let conteneur = document.getElementById(`my_dataviz_${this.state.uuid}`)
        if(conteneur) {
            console.log(`nb. de beignets`, conteneur.childNodes.length)
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

        // set the color scale
        let color = d3.scaleOrdinal()
            .domain(["Guillaume", "Natalya", "David", "Vincent", "Mario"])
            .range(d3. schemePaired
        );

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
            .text( function(d) { return d.data.key + " " + d.data.value + "%" } )
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

    render(){        

        // Ajoute la génération de beignet comme prochaine exécution de la pile JavaScript
        // alors que l'élément my_dataviz est accessible dans le navigateur du client.
        setTimeout(()=>{
            this.genererBeignet()
        }, 0)

        return (    
            <div>                
                <Translation>                
                    {
                        (t, i18n) =>
                            <div>
                                <div id={`my_dataviz_${this.state.uuid}`}>
                                </div>                                
                            </div>
                    }
                </Translation>
            </div>            
        )
    }
}