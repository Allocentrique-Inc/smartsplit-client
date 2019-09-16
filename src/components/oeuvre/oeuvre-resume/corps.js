import React from 'react';
import '../../../assets/scss/oeuvre-resume/corps.scss';
import TitreModifiable from "./titre-modifiable";

export default class Corps extends React.Component {
    render() {
        return (
            <div className={ 'corps ui container' }>
                <div className={ 'ui grid' }>
                    <div className={ 'ui sixteen wide mobile ten wide tablet ten wide computer column' }>
                        <TitreModifiable
                            href={ '#' }
                        >
                            <h3 className={ 'h3-style' }>Création</h3>
                        </TitreModifiable>

                        <table>
                            <tr>
                                <td>
                                    Date de création
                                </td>

                                <td>
                                    8 juillet 2019
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className={ 'ui sixteen wide mobile six wide tablet six wide computer column' }>
                        <TitreModifiable
                            href={ '#' }
                        >
                            <h4 className={ 'h4-style' }>Colonne 2</h4>
                        </TitreModifiable>
                    </div>
                </div>
            </div>
        );
    }
}
