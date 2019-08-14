import React from 'react';
import '../../assets/scss/trackbar.scss';

export class Trackbar extends React.Component {

    render() {
        const progressBarStyle = { width: this.props.pourcentage + '%' };

        return (
            <div className="Trackbar">
                <div className="progress-bar" style={progressBarStyle}></div>
            </div>
        );
    }

}
