import React from 'react';
import '../../assets/scss/trackbar.scss';

export class Trackbar extends React.Component {

    render() {
        const progressBarStyle = { width: this.props.percentage + '%' };

        return (
            <div className="Trackbar">
                <div className="progress-bar" style={progressBarStyle}></div>
            </div>
        );
    }

}
