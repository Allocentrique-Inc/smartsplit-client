import React, { Component } from "react";
import { Translation } from 'react-i18next';
import { Popup } from "semantic-ui-react";

const tooltipStyle = {
    position: "fixed",
    background: "white",
    width: "224px",
    fontFamily: "IBM Plex Sans",
    fontColor: "#203548",
    fontSize: "12px",
    lineHeight: "16px",
    display: "inline",
    alignItems: "center",
    border: "1px solid #DCDFE1",
    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.25)",
    padding: "10px",
    zIndex: "1"
};

const icone = <i className="ui question circle icon" style={{ color: "#687A8B", fontSize: "10pt" }} />
// Ou: 
// declencheur: props.declencheur || <i className="ui question circle icon" style={{ color: "#687A8B", fontSize: "10pt" }} />,

class InfoBulle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            text: props.text,
            declencheur: props.declencheur || icone, // propriété de l'InfoBulle
            decoration: props.decoration, // propriété de PopUp
            sur: props.sur || "hover",
            ouvert: props.ouvert // attribut état interne, quand appellé étant changé
        }
        this.setXY = this.setXY.bind(this)
        this.handleMouseIn = this.handleMouseIn.bind(this) // (): appel de la fonction, (this): fonction
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.text !== nextProps.text) {
            this.setState({ text: nextProps.text })
        }
        if (this.props.declencheur !== nextProps.declencheur) {
            this.setState({ declencheur: nextProps.declencheur })
        }
        if (this.props.ouvert !== nextProps.ouvert) {
            this.setState({ ouvert: nextProps.ouvert })
        }
        if (this.props.decoration !== nextProps.decoration) {
            this.setState({ decoration: nextProps.decoration })
        }
    }
    //Méthode cycle de vie
    //Changer dans parent (lui dire quoi faire) pour appliquer à enfant

    //Modifie position x y
    setXY(e) {
        if (!this.props.pos) {
            this.setState({ pos: { x: e.clientX + 10, y: e.clientY - 50 } })
        } else {
            this.setState({ pos: { x: this.props.pos.x, y: this.props.pos.y } })
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
                                style={{ display: "inline" }}
                                onMouseOver={e => { this.handleMouseIn(e); this.setXY(e) }}
                                onMouseOut={this.handleMouseOut.bind(this)}>
                                {/* fonction créee dans constructeur ou directement quand appellée  */}

                                <Popup
                                    style={this.props.style} // Passer style dans InfoBulle
                                    trigger={this.state.declencheur}
                                    position="right top"
                                    on={this.state.sur}
                                    open={this.state.ouvert} // Ouvre popUp automatiquement
                                >
                                    <div>
                                        {this.state.text}
                                        {
                                            this.state.decoration && (
                                                <div>
                                                    {this.state.decoration}
                                                </div>
                                            )
                                        }
                                    </div>
                                </Popup>

                            </div>
                        </>
                    )
                }
            </Translation>
        )
    }

}

export default InfoBulle;

