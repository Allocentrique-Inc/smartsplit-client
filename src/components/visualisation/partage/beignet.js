/** 
 * Assistant d'affichage du dashboard
 */
import './beignet.css'
import copyIcon from './copyIcon.png'
import starIcon from './starIcon.png'
import prodIcon from './prodIcon.png'
import React, { Component } from 'react'

// Traduction
import { Translation } from 'react-i18next'

// D3
const d3 = require('d3')

export default class Beignet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: 400, //550,
            height: 320, //225,
            margin: 10, //50,
            icon: "",
            data: {},
            colors: {},
            alphas: {},
            uuid: props.uuid,
            type: props.type
        }

    }

    componentDidMount() {
        this.rafraichir(this.props)
    }

    componentWillReceiveProps(nextProps) {
        // Le beignet rafraichit son affichage à chaque changement de propriétés.
        // Il n'y a pas de test sur les attributes (this.props.xyz !== nextProps.xyz)
        this.rafraichir(nextProps)
    }

    rafraichir(props) {
        let _d = {}
        let _c = {}
        let _a = {}
        if (props.data && props.data.length > 0) {

            // construction

            props.data.forEach(elem => {
                let nom
                if (elem && parseFloat(elem.pourcent).toFixed(4) !== "0.0000") {
                    nom = `${elem.ayantDroit.firstName + " "}${elem.ayantDroit.lastName} ${elem.ayantDroit.artistName ? `(${elem.ayantDroit.artistName}) ` : ""}`
                    _d[nom] = elem.pourcent
                }
                _c[nom] = elem.color;
                _a[nom] = elem.alpha;
            })
            this.setState({ data: _d })
            this.setState({ colors: _c })
            this.setState({ alphas: _a })
        }
        this.regenerer = true
    }

    genererBeignet() {

        // Remettre à zéro le conteneur du beignet
        if (this.state.type === "workCopyrightSplit") this.setState({ icon: copyIcon })
        if (this.state.type === "performanceNeighboringRightSplit") this.setState({ icon: starIcon })
        if (this.state.type === "masterNeighboringRightSplit") this.setState({ icon: prodIcon })

        let conteneur = document.getElementById(`my_dataviz_${this.state.uuid}`)
        if (conteneur) {
            let enfants = conteneur.childNodes
            enfants.forEach(_e => {
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

        let color = d3.scaleOrdinal() // D3 Version 4
            .domain(Object.keys(this.state.colors))
            .range(Object.values(this.state.colors));

        let alpha = d3.scaleOrdinal() // D3 Version 4
            .domain(Object.keys(this.state.alphas))
            .range(Object.values(this.state.alphas));

        // Compute the position of each group on the pie:
        let pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(function (d) { return d.value; })

        let data_ready = pie(d3.entries(this.state.data))

        // The arc generator
        let arc = d3.arc()
            .innerRadius(radius * 0.4)         // This is the size of the donut hole
            .outerRadius(radius * 0.95)

        // Another arc that won't be drawn. Just for labels positioning
        /* let outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9) */

        // Define the div for the tooltip
        let myDiv = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        svg.selectAll('allSlices')
            .on("activate", function (d) {
                myDiv.transition()
                    .style("opacity", 0)
            })

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d) { return (color(d.data.key)) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", function (d) { return (alpha(d.data.key) ? 0.1 : 0.9) })
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("stroke", "gray")
                myDiv.transition()
                    .duration(50)
                    .style("opacity", .9);
                myDiv.html(d.data.key + " " + parseFloat(d.data.value).toFixed(2) + "%", 150)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("stroke", "white")
                myDiv.transition()
                    .duration(500)
                    .style("opacity", 0);
            }).call(this.wrapping, 150)

        /*
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
            .call(this.wrapping, 150)
        */

        if (Object.keys(this.state.data).length > 0) {
            svg.append('image')
                .attr('xlink:href', this.state.icon)
                .attr('width', 60)
                .attr('height', 60)
                .attr('x', -30)
                .attr('y', -30)
        }

    }

    wrapping(text, width) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                x = text.attr("x"),
                y = text.attr("y"),
                dy = 0, //parseFloat(text.attr("dy")),
                tspan = text.text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    x = 0;
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
                }
            }
        });
    }

    render() {
        // Ajoute la génération de beignet comme prochaine exécution de la pile JavaScript
        // alors que l'élément my_dataviz est accessible dans le navigateur du client.
        setTimeout(() => {
            if (this.regenerer) {
                this.genererBeignet()
                this.regenerer = false
            }
        }, 0)

        return (
            <Translation>
                {
                    (t, i18n) =>
                        <div style={{ margin: "0 auto" }}>
                            {this.props.titre && (<h4>{this.props.titre}</h4>)}
                            <div id={`my_dataviz_${this.state.uuid}`} className="beignet" >
                            </div>
                        </div>
                }
            </Translation>
        )
    }
}
