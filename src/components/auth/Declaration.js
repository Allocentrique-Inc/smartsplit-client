import React, { Component } from "react";
import "./Declaration.css";
import {
  Button,
  Modal,
  Checkbox
} from "semantic-ui-react";
import { withTranslation } from "react-i18next";

class Declaration extends Component {
  constructor(props) {
    super(props);   

    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      artistName: props.artistName,
      songTitle: props.songTitle,
      identity: false,
      share: false,
      open: props.open,
      votes: props.votes,
      fn: props.fn
    };

    this.click = this.click.bind(this);
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = () => this.setState({ open: false }, () => {
    this.setState({ identity: false })
    this.setState({ share: false })
    if (this.props.onClose) {
      this.props.onClose()
    }
  });

  click() {
    this.handleSubmit();
    this.close();
  }

  handleSubmit = values => {
    if (this.state.fn) {
      this.state.fn();
    }
  };

  handleIdentityCheck = (e, { value }) => {
    this.setState({ identity: !value });
  };

  handleShareCheck = (e, { value }) => {
    this.setState({ share: !value });
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
    }
    if (this.props.firstName !== nextProps.firstName) {
      this.setState({ firstName: nextProps.firstName });
    }
    if (this.props.lastName !== nextProps.lastName) {
      this.setState({ lastName: nextProps.lastName });
    }
    if (this.props.songTitle !== nextProps.songTitle) {
      this.setState({ songTitle: nextProps.songTitle });
    }
    if(this.props.votes !== nextProps.votes) {
      this.setState({votes: nextProps.votes})
    }
  }

  render() {
    const { open, closeOnDimmerClick } = this.state;

    let contientRefus = false
    if(this.state.votes) {
      Object.keys(this.state.votes).forEach(tv=>{
        if(this.state.votes[tv].vote === 'reject') {
          contientRefus = true
        }
      })
    }

    let t = this.props.t, i18n = this.props.i18n

    return (      
      <Modal
        open={open}
        closeOnDimmerClick={closeOnDimmerClick}
        onClose={this.close}
        size="large"
        closeIcon
      >
        <Modal.Header>
          {t("collaborateur.declaration.identite")}{" "}
        </Modal.Header>

        <div className="ui row">
          <div className="declare">
            {
              !contientRefus && (
                <>
                  <Checkbox                    
                    key={"identity"}
                    label=""
                    onChange={this.handleIdentityCheck}
                    className="checkbox"
                  />
                  {i18n.language && i18n.language.substring(0, 2) === "en" && (
                    <div className="accepte">
                      <p>
                        <strong>
                          I declare to really be {this.state.firstName}{" "}
                          {this.state.lastName} (aka. {this.state.artistName}).
                        </strong>{" "}
                        I understand that pretending to be someone else would be a
                        serious misconduct liable to legal prosecution.
                      </p>
                    </div>
                  )}
                  {i18n.language && i18n.language.substring(0, 2) !== "en" && (
                    <div className="accepte">
                      <p>
                        <strong>
                          Je déclare être réellement {this.state.firstName}{" "}
                          {this.state.lastName} ({this.state.artistName}).
                        </strong>{" "}
                        Je comprends que le fait de me faire passer pour quelqu’un
                        d’autre constituerait une faute grave passible de
                        poursuites judiciaires.
                      </p>
                    </div>
                  )}
                </>
              )
            }
            {
              contientRefus && (
                <>
                  {i18n.language && i18n.language.substring(0, 2) === "en" && (
                    <div className="accepte">
                      <p>
                        <strong>
                          Thanks for making a decision.
                          You will receive another email inviting you to see the results. You'll be able to create a new split proposal from there.
                        </strong>
                      </p>
                    </div>
                  )}
                  {i18n.language && i18n.language.substring(0, 2) !== "en" && (
                    <div className="accepte">
                      <p>
                        <strong>
                          Merci d'avoir rendu ta décision. 
                          Lorsque tout le monde se sera exprimé, tu recevras par courriel une invitation à voir le résumé et à soumettre un nouveau split.
                        </strong>
                      </p>
                    </div>
                  )}
                </>
              )
            }
          </div>
        </div>

        <div className="ui row">
          <div className="declare">
            {
              !contientRefus && (
                <>
                  <Checkbox
                    key={"share"}
                    label=""
                    onChange={this.handleShareCheck}
                    className="checkbox"
                  />
                  {i18n.language && i18n.language.substring(0, 2) === "en" && (
                    <div className="accepte">
                      <p>
                        <strong>I accept these rights splits</strong> between
                        myself and any collaborator. This represents the desired
                        agreement. I understand that these percentages will now
                        apply to any revenue sharing related to{" "}
                        <em>{this.state.songTitle}</em>.
                      </p>
                    </div>
                  )}
                  {i18n.language && i18n.language.substring(0, 2) !== "en" && (
                    <div className="accepte">
                      <p>
                        <strong>J'accepte ces partages de droits</strong>{" "}
                        intervenus entre moi-même et tout collaborateur. Cela
                        représente l’entente souhaitée. Je comprends que ces
                        pourcentages s’appliqueront désormais à tout partage de
                        revenus en lien avec <em>{this.state.songTitle}</em>.
                      </p>
                    </div>
                  )}
                </>
              )
            }                
          </div>
        </div>

        <Modal.Actions>

          {
            !contientRefus && (
              <>
                <Button onClick={this.close} negative>
                  {t("flot.split.collaborateur.attribut.bouton.annuler")}
                </Button>

                <Button
                  onClick={this.click}
                  className={
                    !this.state.identity || !this.state.share ? "ui disabled" : ""
                  }
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content={t("collaborateur.declaration.accepter")}
                />
              </>                  
            )
          }
          {
            contientRefus && (
              <Button
                onClick={this.click}                    
                positive
                icon="checkmark"
                labelPosition="right"
                content={t("collaborateur.declaration.compris")}
              />
            )
          }              
        </Modal.Actions>
      </Modal>      
    );
  }
}
export default withTranslation()(Declaration);
