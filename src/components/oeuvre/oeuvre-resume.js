import React from 'react';
import { Translation } from "react-i18next";
import Page from "../page-assistant/page";
import Colonne from "../page-assistant/colonne";

export default class OeuvreResume extends React.Component {
    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <Page
                            pochette={ this.props.pochette }
                        >
                            <Colonne>
                                Résumé!
                            </Colonne>
                        </Page>

                }
            </Translation>
        )
    }
}
