import React, { Component } from "react";
import { Translation } from 'react-i18next';

class InfoBulle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    handleMouseIn() {
        this.setState({ hover: true })
    }

    handleMouseOut() {
        this.setState({ hover: false })
    }

    render() {
        const tooltipStyle = {
            display: this.state.hover ? 'block' : 'none'
        }
        return (
            <Translation>
                {
                    t => (
                        <>
                            <div className="ui question circle icon"
                                onMouseOver={this.handleMouseIn.bind(this)}
                                onMouseOut={this.handleMouseOut.bind(this)}>
                                <div style={tooltipStyle}>
                                    {t("tooltip.egal")}
                                    {t("tooltip.roles")}
                                    {t("tooltip.manuel")}
                                </div>
                            </div>
                        </>
                    )
                }
            </Translation>
        )
    }

}

export default InfoBulle;

