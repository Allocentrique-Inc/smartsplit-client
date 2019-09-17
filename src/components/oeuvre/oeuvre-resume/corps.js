import React from 'react';
import '../../../assets/scss/oeuvre-resume/corps.scss';
import TitreModifiable from "./titre-modifiable";
import TableCreation from "./table-creation";
import TableInterpretation from "./table-interpretation";
import TableEnregistrement from "./table-enregistrement";

export default class Corps extends React.Component {
    render() {
        return (
            <div className={ 'corps ui container' }>
                <div className={ 'ui grid' }>
                    <div className={ 'ui sixteen wide mobile ten wide tablet ten wide computer column' }>
                        <TableCreation/>
                        <TableInterpretation/>
                        <TableEnregistrement/>
                    </div>

                    <div className={ 'ui sixteen wide mobile six wide tablet six wide computer column' }>
                        <TitreModifiable
                            href={ '#' }
                        >
                            <h4 className={ 'corps-title-2' }>Colonne 2</h4>
                        </TitreModifiable>
                    </div>
                </div>
            </div>
        );
    }
}
