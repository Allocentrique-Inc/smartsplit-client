import React, { Component } from "react";
import { Translation } from 'react-i18next';

class InfoBulle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <>
                            <div className="ui question circle icon" onMouseOver={() => this.setState({ hover: true })}>
                                <span className="tooltiptext egal">{t("tooltip.egal")}</span>
                                <span className="tooltiptext roles">{t("tooltip.roles")}</span>
                                <span className="tooltiptext manuel">{t("tooltip.manuel")}</span>
                            </div>
                        </>
                    )
                }
            </Translation>
        )
    }

}

export default InfoBulle;

