import React from 'react';
import { Translation } from "react-i18next";
import { Navbar } from "./oeuvre-resume/navbar";
import Entete from "./oeuvre-resume/entete";
import Corps from "./oeuvre-resume/corps";

export default class OeuvreResume extends React.Component {
    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <>
                            <Navbar/>
                            <Entete/>
                            <Corps/>
                        </>
                }
            </Translation>
        )
    }
}
