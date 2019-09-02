import React from 'react';
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";

export default class ChampTexte extends React.Component {
    render() {
        return (
            <div className="champ">
                <label>
                    <TitreChamp
                        label={ this.props.label }
                        description={ this.props.description }
                    />

                    <Input
                        fluid
                        placeholder={ this.props.placeholder }
                        onChange={ this.props.onChange }
                    />
                </label>
            </div>
        );
    }
}
