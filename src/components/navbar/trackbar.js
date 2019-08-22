import React from 'react';
import '../../assets/scss/trackbar.scss';

export class Trackbar extends React.Component {

    render() {
        const progressBarStyle = { width: this.props.pourcentage + '%' };

        return (
            <div className={ 'Trackbar ' + (this.props.pochette ? 'pochette' : '') }>
                <div className="progress-bar" style={progressBarStyle}></div>
            </div>
        );
    }

}
