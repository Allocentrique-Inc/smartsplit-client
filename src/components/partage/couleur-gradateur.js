import React, { Component } from "react";
import "../../assets/scss/page-assistant/pages-assistant-partage.scss";

const COLORS = ["#BCBBF2", "#D9ACF7", "#EBB1DC", "#FFAFA8", "#FCB8C5", "#FAC0AE", "#FFD0A9", "#F8EBA3", "#C6D9AD", "#C6F3B6", "#93E9E4", "#91DDFE", "#A4B7F1"]
const inactive = '#F2EFF0'

class couleurGradateur extends Component {
    inputRef = React.createRef()
    state = { value: 1 }

  handleChange = (min, max) => (event) => {
    const value = event.target.value
    const progress = (value / max) * 100 + '%'
    this.setState({ value: value })
    const newBackgroundStyle = `linear-gradient(90deg, ${COLORS} 0% ${progress}%,   ${inactive} ${progress}% 100%)`
    this.inputRef.current.style.background = newBackgroundStyle
  }
    render() {
        const minValue = 1 
        const maxValue = 300
        const progress = (this.state.value / maxValue) * 100 + '%'

        const styleInput = {
            background: `linear-gradient(90deg, ${COLORS} 0% ${progress},   ${inactive} ${progress} 100%)`,
    }

        return (
            
            <div>
              <input
                ref={this.inputRef}
                id="sliderId"
                className="inputR"
                name="sliderName"
                type="range"
                min={minValue}
                max={maxValue}
                value={this.state.value}
                onChange={this.handleChange(minValue, maxValue)}
                style={styleInput}
              />
              <div className="label" style={{textAlign: 'center'}}>
                {this.state.value}
              </div>
            </div>
          )
        }
      }

export default couleurGradateur;
