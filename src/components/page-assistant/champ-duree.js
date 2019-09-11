import React from 'react';
import TitreChamp from "./titre-champ";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import '../../assets/scss/page-assistant/champ-duree.scss';

export default class ChampDuree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            minutes: this.parseMinutes(this.msDuration()),
            seconds: this.parseSeconds(this.msDuration())
        }
    }

    parseMinutes(msDuration) {
        return Math.floor(msDuration / 60000);
    }

    parseSeconds(msDuration) {
        return Math.round(msDuration / 1000) - (this.parseMinutes(msDuration) * 60);
    }

    msDuration() {
        return Number(this.props.msDuration) || 0;
    }

    label() {
        const paddedSeconds = ('00' + this.state.seconds).slice(-2);
        return this.props.label + ' (' + this.state.minutes + ':' + paddedSeconds + ')'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.validateMinutes(prevState);
        this.validateSeconds(prevState);
        if (this.hasChanged(prevState, 'minutes') || this.hasChanged(prevState, 'seconds')) {
            const newMsDuration = (this.state.minutes * 60000) + (this.state.seconds * 1000);
            this.props.onChange(newMsDuration);
        }
    }

    validateMinutes(prevState) {
        return;
    }

    validateSeconds(prevState) {
        return;
    }

    minutesHasChanged(prevState) {
        return this.state.minutes !== prevState.minutes;
    }

    hasChanged(prevState, key) {
        return this.state[key] !== prevState[key];
    }

    render() {
        return (
            <div className="champ">
                <label>
                    <TitreChamp
                        label={ this.label() }
                        description={ this.props.description }
                    />

                    <div className="ui grid">
                        <div className="ui row">
                            <div className="ui eight wide column input-duree">
                                <div className="input-duree">
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="MM"
                                        value={ this.state.minutes }
                                        onChange={ (event, { value }) => this.setState({ minutes: value }) }
                                    />

                                    <div className="duree-label">min.</div>
                                </div>
                            </div>

                            <div className="ui eight wide column input-duree">
                                <div className="input-duree">
                                    <Input
                                        type="number"
                                        min="0"
                                        max="59"
                                        placeholder="SS"
                                        value={ this.state.seconds }
                                        onChange={ (event, { value }) => this.setState({ seconds: value }) }
                                    />

                                    <div className="duree-label">sec.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
            </div>
        )
    }
}
