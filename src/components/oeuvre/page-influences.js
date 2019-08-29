import React from 'react';
import { Translation } from "react-i18next";
import { PageAssistant } from '../canevas/page-assistant';
import { ChampDate } from "../formulaires/champ-date";

export default class PageInfluences extends React.Component {

    icon() {
        return '';
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <PageAssistant
                            pochette={ this.props.pochette }
                            sectionIcon={ this.icon() }
                            sectionLabel={ 'Influences' }
                            sectionQuestion={ 'Question?' }
                            sectionDescription={ 'Description' }
                        >
                            <ChampDate
                                label="Date de création"
                                value={ this.props.values.creationDate }
                            />
                        </PageAssistant>
                }
            </Translation>
        )
    }
}
