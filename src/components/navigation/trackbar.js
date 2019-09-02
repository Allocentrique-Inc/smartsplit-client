import React from 'react';
import '../../assets/scss/trackbar.scss';

export class Trackbar extends React.Component {

    render() {
        const progressBarStyle = { width: this.props.percentage + '%' };

        return (
            <div className={ 'Trackbar ' + (this.props.pochette ? 'pochette' : '') }>
                <div className="progress-bar" style={progressBarStyle}></div>
            </div>
        );
    }

}