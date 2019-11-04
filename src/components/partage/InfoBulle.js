import React, { Component } from "react";
import { Translation } from 'react-i18next';

const tooltipStyle = {
    position: "fixed",
    background: "white",
    width: "224px",
    fontFamily: "IBM Plex Sans",
    fontColor: "#203548",
    fontSize: "12px",
    lineHeight: "16px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #DCDFE1",
    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.25)",
    padding: "10px",
    zIndex: "1"
};

class InfoBulle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            text: props.text           
        }
        this.setXY = this.setXY.bind(this)
        this.handleMouseIn = this.handleMouseIn.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.text !== nextProps.text) {
            this.setState({text: nextProps.text})
        }
    }

    //Modifie position x y
    setXY(e) {
        if(!this.props.pos) {
            this.setState({ pos: { x: e.clientX + 10, y: e.clientY - 50} })
        } else {
            this.setState({ pos: { x: this.props.pos.x, y: this.props.pos.y} })
        }        
    }

    //Attrape et passe ça à setXY pour reprendre contrôle
    handleMouseIn() {
        this.setState({ hover: true })
    }

    handleMouseOut() {
        this.setState({ hover: false })
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <>
                            <div
                                className="cliquable"
                                style={{display: "inline"}}
                                onMouseOver={e => { this.handleMouseIn(e); this.setXY(e) }}
                                onMouseOut={this.handleMouseOut.bind(this)}>
                                <i className="ui question circle icon" style={{ color: "#687A8B" }} />
                                {/* Object Assign quand assigner plusieurs objets à var */}
                                {/* tooltipStyle en dernier car = const: peut pas modifier */}
                                {this.state.hover && (<div style={Object.assign({ top: this.state.pos.y, left: this.state.pos.x }, tooltipStyle)}>
                                    {this.state.text}
                                </div>)}

                            </div>
                        </>
                    )
                }
            </Translation>
        )
    }

}

export default InfoBulle;

