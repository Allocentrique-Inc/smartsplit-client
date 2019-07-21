/** 
 * Assistant d'affichage du dashboard
 */
import './histogramme.css'
import React, { Component } from 'react'

// Traduction
import { Translation } from 'react-i18next'

// D3
const d3 = require('d3')

export default class Histogramme extends Component {

    constructor(props){
        super(props)
        this.state = {
            width: 1024,
            height: 768,
            margin: 125,
            data: props.data,
            data3: { 
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

        //this.genererBeignet = this.genererBeignet.bind(this)
    }

    genererHisto() {

        var dataArray = Object.values(this.state.data);
        var namesArray = Object.keys(this.state.data);
        var w = this.state.width;   
        var h = this.state.height;
        var barPadding = 1;    

        // append the svg object to the div called 'my_dataviz'
        let svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
            
        let xScale = d3.scaleLinear()
            .range([0, w])
            .domain([0, dataArray.length]);
            
        let yScale = d3.scaleLinear()
            .range([h, 0])
            .domain([0, d3.max(dataArray, function(d){ return d; })]);
        
        svg.selectAll("rect")
            .data(dataArray)
            .enter()
            .append("rect")
            //.attr("x", 0)
            .attr("x", function(d, i) {
                return i * (w / 29);
            })
            //.attr("y", 0)
            .attr("y", function(d) {
                 return ((h / 2) + 30) - ((w / 100) * d);
            })
            .attr("fill", "teal")
            .attr("width", 20)
            //.attr("height", 100);
            .attr("height", function(d) {
                return (w / 100) * d;  //Just the data value
            });
        
        svg.selectAll("text")
            .data(namesArray)
            .enter()
            .append("text")
            .text(function(d, i) {
                return d + " " + dataArray[i] + "%";
            })   
            .attr("x", function(d, i) {
                return 300 + (i * (w / 40));
            })
            .style("fill","black")
            .attr("text-anchor", "start")
            .attr("transform", "rotate(45)")
            //.attr("y", 400);
            .attr("y", function(d, i) {
                return 300 - (25.4 * i);
            });
    }

    render(){        

        // Ajoute la génération de beignet comme prochaine exécution de la pile JavaScript
        // alors que l'élément my_dataviz est accessible dans le navigateur du client.
        setTimeout(()=>{
            this.genererHisto()
        }, 0)

        return (    
            <div>                
                <Translation>                
                    {
                        (t, i18n) =>
                            <div>
                                <div id="my_dataviz">
                                </div>                                
                            </div>
                    }
                </Translation>
            </div>            
        )
    }
}