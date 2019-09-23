import React from 'react';
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

    labelTime() {
        const paddedSeconds = ('00' + this.state.seconds).slice(-2);
        return this.state.minutes + ':' + paddedSeconds;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const cleanMinutes = this.getCleanMinutes(prevState);
        const cleanSeconds = this.getCleanSeconds(prevState);
        const newMsDuration = (cleanMinutes * 60000) + (cleanSeconds * 1000);

        if (this.stateHasChanged(prevState)) {
            this.props.onChange(newMsDuration);
            this.setState({
                minutes: cleanMinutes,
                seconds: cleanSeconds
            })
        }
    }

    getCleanMinutes(prevState) {
        return this.hasChanged(prevState, 'minutes') ?
            this.getPositiveInteger(this.state.minutes) :
            this.state.minutes;
    }

    getPositiveInteger(minutes) {
        const number = Number(minutes) || 0;
        const integer = Math.round(number);
        return integer < 0 ? 0 : integer;
    }

    getCleanSeconds(prevState) {
        return this.hasChanged(prevState, 'seconds') ?
            this.getPositiveIntegerUnder60(this.state.seconds) :
            this.state.seconds;
    }

    getPositiveIntegerUnder60(seconds) {
        const positiveInteger = this.getPositiveInteger(seconds);
        return positiveInteger > 59 ? 59 : positiveInteger;
    }

    hasChanged(prevState, key) {
        return this.state[key] !== prevState[key];
    }

    stateHasChanged(prevState) {
        return this.hasChanged(prevState, 'minutes') || this.hasChanged(prevState, 'seconds');
    }

    render() {
        return (
            <div className="champ">
                <label>
                    <div className="input-title">
                        <div className="input-label">
                            { this.props.label } <span className={ 'medium-400-style' }>({ this.labelTime() })</span>
                        </div>
                    </div>

                    <div className="ui grid">
                        <div className="ui row">
                            <div className="ui eight wide column input-duree">
                                <div className="input-duree">
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={ this.state.minutes || '' }
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
                                        placeholder="00"
                                        value={ this.state.seconds || '' }
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
