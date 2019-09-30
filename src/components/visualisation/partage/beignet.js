/**
 * Assistant d'affichage du dashboard
 */
import "./beignet.css";
import React, { Component } from "react";

// Traduction
import { Translation } from "react-i18next";

// D3
const d3 = require("d3");

export default class Beignet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 600, //550,
      height: 200, //225,
      margin: 0, //50,
      data: {},
      colors: {},
      alphas: {},
      uuid: props.uuid
    };
  }

  componentDidMount() {
    this.rafraichir(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // Le beignet rafraichit son affichage à chaque changement de propriétés.
    // Il n'y a pas de test sur les attributes (this.props.xyz !== nextProps.xyz)
    this.rafraichir(nextProps);
  }

  rafraichir(props) {
    let _d = {};
    let _c = {};
    let _a = {};
    if (props.data && props.data.length > 0) {
      props.data.forEach(elem => {
        if (elem && parseFloat(elem.pourcent).toFixed(4) !== "0.0000") {
          _d[elem.nom] = elem.pourcent;
        }
        _c[elem.nom] = elem.color;
        _a[elem.nom] = elem.alpha;
      });
      this.setState({ data: _d });
      this.setState({ colors: _c });
      this.setState({ alphas: _a });
    }
  }

  genererBeignet() {
    // Remettre à zéro le conteneur du beignet
    let conteneur = document.getElementById(`my_dataviz_${this.state.uuid}`);
    if (conteneur) {
      let enfants = conteneur.childNodes;
      enfants.forEach(_e => {
        conteneur.removeChild(_e);
      });
    }

    // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
    let radius =
      Math.min(this.state.width, this.state.height) / 2 - this.state.margin;

    // append the svg object to the div called 'my_dataviz'
    let svg = d3
      .select(`#my_dataviz_${this.state.uuid}`)
      .append("svg")
      .attr("width", this.state.width)
      .attr("height", this.state.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.state.width / 2 + "," + this.state.height / 2 + ")"
      );

    //let color = d3.scaleOrdinal() // D3 Version 4
    //    .domain(domaineDeNoms)
    //    .range(["#EBB1DC", "#F6BCC7", "#FED2AC", "#F8EBA3", "#C6F3B6", "#AAE7E8", "#A4B7F1", "#BDBCF9"]);
    let color = d3
      .scaleOrdinal() // D3 Version 4
      .domain(Object.keys(this.state.colors))
      .range(Object.values(this.state.colors));

    let alpha = d3
      .scaleOrdinal() // D3 Version 4
      .domain(Object.keys(this.state.alphas))
      .range(Object.values(this.state.alphas));

    // Compute the position of each group on the pie:
    let pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(function(d) {
        return d.value;
      });

    let data_ready = pie(d3.entries(this.state.data));

    // The arc generator
    let arc = d3
      .arc()
      .innerRadius(radius * 0.4) // This is the size of the donut hole
      .outerRadius(radius * 0.95);

    // Another arc that won't be drawn. Just for labels positioning
    let outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", function(d) {
        return color(d.data.key);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", function(d) {
        return alpha(d.data.key) ? 0.1 : 0.9;
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function(d) {
        let posA = arc.centroid(d); // line insertion in the slice
        let posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        let posC = outerArc.centroid(d); // Label position = almost the same as posB
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function(d) {
        return d.data.key + " " + parseFloat(d.data.value).toFixed(2) + "%";
      })
      .attr("transform", function(d) {
        let pos = outerArc.centroid(d);
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function(d) {
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }

  render() {
    // Ajoute la génération de beignet comme prochaine exécution de la pile JavaScript
    // alors que l'élément my_dataviz est accessible dans le navigateur du client.
    setTimeout(() => {
      this.genererBeignet();
    }, 0);

    return (
      <Translation>
        {(t, i18n) => (
          <div style={{ margin: "0 auto" }}>
            {this.props.titre && <h4>{this.props.titre}</h4>}
            <div id={`my_dataviz_${this.state.uuid}`} className="beignet">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM12.4443 6.7706C12.3585 6.6044 12.1871 6.5 12 6.5C11.813 6.5 11.6416 6.6044 11.5557 6.7706L9.975 9.8319L6.43083 10.3271C6.2398 10.3538 6.08116 10.488 6.02316 10.6719C5.96516 10.8559 6.01813 11.0568 6.1593 11.1882L8.70972 13.5629L8.10887 16.9117C8.07543 17.0981 8.15016 17.2874 8.30192 17.4007C8.45367 17.514 8.6564 17.5318 8.82559 17.4467L12 15.8509L15.1744 17.4467C15.3436 17.5318 15.5464 17.514 15.6981 17.4007C15.8499 17.2874 15.9246 17.0981 15.8912 16.9117L15.2903 13.5629L17.8407 11.1882C17.9819 11.0568 18.0349 10.8559 17.9769 10.6719C17.9189 10.488 17.7602 10.3538 17.5692 10.3271L14.025 9.8319L12.4443 6.7706Z"
                  fill="#8DA0B3"
                />
              </svg>
            </div>
          </div>
        )}
      </Translation>
    );
  }
}
