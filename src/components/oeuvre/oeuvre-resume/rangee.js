import React from 'react'
import helpIcon from "../../../assets/svg/icons/help-circle-full.svg"
import { useTranslation, Translation } from "react-i18next"

const uuidv1 = require("uuid/v1")

export default function Rangee(props) {
    const { t } = useTranslation();

    return <BaseRangee {...props} t={t} />
}

export function BaseRangee(props) {
    const placeholder = props.t("sommaire.autres.info");
    let uuid = uuidv1()
    return (
        <Translation>
            {(t =>
                <tr key={`rangee-${uuid}`}>
                    <td className={'table-label'}>
                        {props.label} {renderHelpIcon(props)}
                    </td>

                    <td className={props.value ? '' : 'placeholder'}>
                        {props.value || placeholder}
                    </td>
                </tr>
            )}
        </Translation>
    );
}

function renderHelpIcon(props) {
    return props.helpIcon ?
        (<img className={'help-icon'} src={helpIcon} alt={'Aide'} />) :
        (<></>)    
}
