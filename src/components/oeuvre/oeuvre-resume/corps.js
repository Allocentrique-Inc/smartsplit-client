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
    render() {
        return (
            <div className={ 'corps ui container' }>
                <div className={ 'ui grid' }>
                    <div className={ 'ui sixteen wide mobile ten wide tablet ten wide computer column' }>
                        <TableCreation media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <TableInterpretation media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <TableEnregistrement media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                    </div>

                    <div className={ 'ui sixteen wide mobile six wide tablet six wide computer column' }>
                        <TableInformationsGenerales media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <SectionEcouter media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} pochette={this.props.pochette} />
                        <SectionTelechargements media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                        <SectionParoles media={this.props.media} rightHolders={this.props.rightHolders} roles={this.props.roles} />
                    </div>
                </div>
            </div>
        );
    }
}
