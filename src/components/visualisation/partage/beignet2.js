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
import AideAyantDroit from '../../../utils/ayantdroit'

// D3
const d3 = require('d3')

export default class Beignet2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: 600, //550,
            height: 480, //225,
            margin: 10, //50,
            icon: "",
            data: props.data,
            colors: {},
            alphas: {},
            uuid: props.uuid,
            type: props.type,
            accomp: false,
            side: "left"
        }
        if(props.data) { this.rafraichir(props) }
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
            let accomp = false

            props.data.forEach(elem => {
                let nom
                if (elem && parseFloat(elem.pourcent).toFixed(4) !== "0.0000") {
                    nom = AideAyantDroit.affichageDuNom(elem.ayantDroit)
                    _d[nom] = elem.pourcent
                }
                _c[nom] = elem.color;
                _a[nom] = elem.alpha;
                if (!elem.principal) accomp = true
            })
            this.setState({ data: _d })
            this.setState({ colors: _c })
            this.setState({ alphas: _a })
            this.setState({ accomp: accomp })
            this.setState({ side: props.side })
        }
        this.regenerer = true
    }

    genererBeignet() {

        // Remettre à zéro le conteneur du beignet
        if (this.state.type === "workCopyrightSplit") this.setState({ icon: copyIcon })
        if (this.state.type === "performanceNeighboringRightSplit") this.setState({ icon: starIcon })
        if (this.state.type === "masterNeighboringRightSplit") this.setState({ icon: prodIcon })
        let chartRotation = 0
        if (this.state.type === "performanceNeighboringRightSplit" && this.state.accomp) chartRotation = 216
        let startAngle = 0
        let stopAngle = Math.PI
        if (this.state.side === "left") {
            startAngle = Math.PI
            stopAngle = 2 * Math.PI
        }

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
            .attr("style", "position: absolute; top: 0px")
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
            .startAngle(startAngle)
            .endAngle(stopAngle)

        let data_ready = pie(d3.entries(this.state.data))

        // The arc generator
        let arc = d3.arc()
            .innerRadius(radius * 0.4)         // This is the size of the donut hole
            .outerRadius(radius * 0.95)

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
            .attr("transform","rotate("+chartRotation+")")
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

        let flush = { position: "absolute", top: "0px", left: "0px" }
        if (this.props.titre === "Musique") flush = { position: "absolute", top: "0px", right: "20px" }

        return (
            <Translation>
                {
                    (t, i18n) =>
                        <div style={{ margin: "0 auto" }}>
                            {this.props.titre && (<h4 style={ flush }>{this.props.titre}</h4>)}
                            <div id={`my_dataviz_${this.state.uuid}`} className="beignet" >
                            </div>
                        </div>
                }
            </Translation>
        )
    }
}
