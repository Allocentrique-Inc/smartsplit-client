import React from 'react';
import '../../../assets/scss/oeuvre-resume/corps.scss';
import TableCreation from "./table-creation";
import TableInterpretation from "./table-interpretation";
import TableEnregistrement from "./table-enregistrement";
import TableInformationsGenerales from "./table-informations-generales";
import SectionEcouter from "./section-ecouter";
import SectionTelechargements from "./section-telechargements";
import SectionParoles from "./section-paroles";
export default class Corps extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            acces: props.acces
        }
    }

    render() {
        return (
            <div className={ 'corps ui container' }>
                <div className={ 'ui grid' }>
                    <div className={ 'ui sixteen wide mobile ten wide tablet ten wide computer column' }>
                        <TableCreation jeton={this.props.jeton} edition={this.props.edition} media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <TableInterpretation jeton={this.props.jeton} edition={this.props.edition} media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <TableEnregistrement jeton={this.props.jeton} edition={this.props.edition} media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                    </div>

                    <div className={ 'ui sixteen wide mobile six wide tablet six wide computer column' }>
                        <TableInformationsGenerales jeton={this.props.jeton} edition={this.props.edition} media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <SectionEcouter jeton={this.props.jeton} edition={this.props.edition} media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} pochette={this.props.pochette} />
                        <SectionTelechargements jeton={this.props.jeton} membreEquipe={this.props.membreEquipe} acces={this.state.acces} pochette={this.props.pochette} edition={this.props.edition} media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <SectionParoles jeton={this.props.jeton} membreEquipe={this.props.membreEquipe} acces={this.state.acces} edition={this.props.edition} media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                    </div>
                </div>
            </div>
        );
    }
}
