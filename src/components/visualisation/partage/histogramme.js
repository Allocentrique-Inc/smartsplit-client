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
            dataset: [25, 18, 12, 7.5, 7.5, 7.5, 4.5, 4.5, 4.5, 4.5, 4.5],
            nameset: ["Guillaume", "Georges", "Natalya", "Vincent", "David", "Steve", "Mario", "Erica", "Martine", "Jean-François", "Danielle"]
        }

        //this.genererBeignet = this.genererBeignet.bind(this)
    }

genererHisto() {

    console.log("genererHisto");
    var dataset = this.state.dataset;
    var nameset = this.state.nameset;

    var margin = {top: 50, right: 140, bottom: 150, left: 60}
    var width = window.innerWidth - 20 - margin.left - margin.right // Use the window's width 
    var height = window.innerHeight - 20 - margin.top - margin.bottom; // Use the window's height
    
    var svg = d3.select('svg')  
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
            //.attr("width", width)  
            //.attr("height", height)  
            //.attr("class", "bar-chart");
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var colors = d3.scaleOrdinal(d3.schemePaired);

    var xScale = d3.scaleLinear()
        .domain([0, dataset.length - 1])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(d3.values(dataset))])
        .range([height, 0]);

    var barPadding = 7.2;  
    var barWidth = (width / dataset.length);
    var x = d3.scaleLinear().range([0, width]);

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale).ticks(5))
      .selectAll("text")	
        .text(function(d) { return d + " %"; })
        .style("font", "16px arial");

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
        .attr("transform", "rotate(45)");

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
             var translate = [5 + (barWidth + barPadding) * i, 0];  
             return "translate("+ translate +")";  
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
                                <svg></svg>                          
                            </div>
                    }
                </Translation>
            </div>            
        )
    }
}