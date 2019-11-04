import React, { Component } from "react"

export default class Lock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actif: props.actif,
            onClick: props.onClick
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.actif !== nextProps.actif) {
            this.setState({ actif: nextProps.actif })
        }
    }

    render() {
        let lockInactif = (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 11H6C4.89543 11 4 11.8954 4 13V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V13C20 11.8954 19.1046 11 18 11Z" stroke="#8DA0B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10.9999V6.99991C6.99876 5.75996 7.45828 4.56378 8.28938 3.64358C9.12047 2.72338 10.2638 2.14481 11.4975 2.0202C12.7312 1.89558 13.9671 2.23381 14.9655 2.96922" stroke="#8DA0B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )

        let lockActif = (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 11H6C4.89543 11 4 11.8954 4 13V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V13C20 11.8954 19.1046 11 18 11Z" stroke="#8DA0B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#8DA0B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )

        return (
            <div className="lock" onClick={this.state.onClick}>
                {
                    this.state.actif && lockActif
                }
                {
                    !this.state.actif && lockInactif
                }
            </div>
        )
    }
}
