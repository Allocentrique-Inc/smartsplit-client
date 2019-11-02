import React from 'react';
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";

export default class ChampTexte extends React.Component {
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
                    />

                    <Input
                        fluid
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={(event, { value }) => this.props.onChange(value)}
                    />

                    {this.undertext()}
                </label>
            </div>
        );
    }
}
