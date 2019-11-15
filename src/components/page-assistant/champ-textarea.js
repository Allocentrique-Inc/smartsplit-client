import React from 'react';
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";

export default class ChampTextArea extends React.Component {
    undertext() {
        return this.props.undertext ?
            (<p className="undertext">{this.props.undertext}</p>) :
            (<></>);
    }

    render() {
        return (
            <div className="champ">
                <label>
                    <TitreChamp
                        label={this.props.label}
                        description={this.props.description}
                        info={this.props.info}
                        text={this.props.text}
                    />

                    <textarea
                        placeholder={this.props.placeholder}
                        onChange={event => this.props.onChange ? this.props.onChange(event.target.value) : null}
                        rows={this.props.rows || 8}
                        value={this.props.value}
                    ></textarea>

                    {this.undertext()}
                </label>
            </div>
        );
    }
}
