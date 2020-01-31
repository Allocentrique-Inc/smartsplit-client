import React, { Component } from "react";
import { Popup } from "semantic-ui-react";

const icone = <i className="ui question circle icon" style={{ color: "#687A8B", fontSize: "10pt" }} />

class InfoBulle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            text: props.text,
            declencheur: props.declencheur || icone, // propriété de l'InfoBulle
            decoration: props.decoration, // propriété de PopUp
            sur: props.sur || "hover",
            ouvert: props.ouvert, // attribut état interne, quand appellé étant changé
            orientation: props.orientation || "top center",
            style: props.style || {}
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
   
    setXY(e) {
        if (!this.props.pos) {
            this.setState({ pos: { x: e.clientX + 10, y: e.clientY - 50 } })
        } else {
            this.setState({ pos: { x: this.props.pos.x, y: this.props.pos.y } })
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
            <>
                <div
                    className="cliquable"
                    style={{ display: "inline" }}
                    onMouseOver={e => { this.handleMouseIn(e); this.setXY(e) }}
                    onMouseOut={this.handleMouseOut.bind(this)}>
                    <Popup
                        style={this.state.style} // Passer style dans InfoBulle
                        trigger={this.state.declencheur}
                        position={this.state.orientation}
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

}

export default InfoBulle;

