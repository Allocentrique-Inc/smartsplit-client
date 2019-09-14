import React from 'react';
import { Button, Modal } from "semantic-ui-react";
import positiveImage from '../../assets/images/positive.png';
import closeIcon from '../../assets/svg/icons/x.svg';
import '../../assets/scss/page-assistant/modal.scss';

export default class ModalFin extends React.Component {
    render() {
        return (
            <Modal
                open={ this.props.open }
                onClose={ this.props.onClose }
            >
                <div className="modal-navbar">
                    <div className="left">
                        <div className="title">
                            Documentation créée
                        </div>
                    </div>

                    <div className="right">
                        <a className="close-icon" onClick={ this.props.onClose }>
                            <img src={ closeIcon } alt={ 'close' }/>
                        </a>
                    </div>
                </div>

                <div className="modal-content">
                    <img className={ 'success-image' } src={ positiveImage } alt={ 'Positive' }/>

                    <h4 className={ 'h4-style' }>{ this.props.songTitle } est maintenant documentée!</h4>

                    <p className={ 'description' }>
                        Tu es à un <em>clic</em> de pouvoir publier les crédits de cette pièce sur une
                        page web et ainsi d’augmenter ta découvrabilité dans le <em>web des données</em>.
                    </p>
                </div>

                <div className={ 'modal-bottom-bar' }>
                    <a href={ '/resume' }>
                        <Button>Voir le résumé</Button>
                    </a>
                </div>
            </Modal>
        );
    }
}
