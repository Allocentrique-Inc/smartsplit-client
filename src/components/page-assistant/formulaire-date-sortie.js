import React from 'react';
import TitreChamp from "./titre-champ";

export default class FormulaireDateSortie extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            determined: this.props.value ? 'true' : 'false',
            inputValue: '',
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.determined !== prevState.determined && this.state.determined === false) {
            this.props.onChange(null);
        }

        if (this.state.determined === 'true' && this.state.inputValue !== prevState.inputValue) {
            this.props.onChange(this.state.inputValue);
        }
    }

    handleRadioChange = event => this.setState({ determined: event.target.value });

    render() {
        return (
            <div className="champ">
                <TitreChamp
                    label="Date de sortie de la pièce musicale (si applicable)"
                    description="C’est le moment où la pièce est lancée sur les plateformes."
                />

                <div>
                    <div className="ui radio checkbox">
                        <input type="radio"
                               name="type"
                               value='false'
                               checked={ this.state.determined === 'false' }
                               onChange={ this.handleRadioChange }
                        />

                        <label>À venir</label>
                    </div>
                </div>

                <div>
                    <div className="ui radio checkbox">
                        <input type="radio"
                               name="type"
                               value='true'
                               checked={ this.state.determined === 'true' }
                               onChange={ this.handleRadioChange }
                        />

                        <label>Date déterminée</label>
                    </div>
                </div>
            </div>
        );
    }
}
