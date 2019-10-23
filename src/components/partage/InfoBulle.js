import React, { Component } from "react";
import { Translation } from 'react-i18next';

const tooltipStyle = {
    position: "absolute",
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
    zIndex: "1",
    bottom: "45%",
    left: "60%"
};

class InfoBulle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            text: props.text
        }
    }

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
                                onMouseOver={this.handleMouseIn.bind(this)}
                                onMouseOut={this.handleMouseOut.bind(this)}>
                                <i className="ui question circle icon" style={{ color: "#687A8B" }} />
                                {this.state.hover && (<div style={tooltipStyle}>
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

