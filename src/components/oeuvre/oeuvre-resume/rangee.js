import React from "react";
import helpIcon from "../../../assets/svg/icons/help-circle-full.svg";
import { withTranslation } from "react-i18next";
import InfoBulle from '../../partage/InfoBulle';

const uuidv1 = require("uuid/v1");

function Rangee(props) {
  const placeholder = props.t("sommaire.autres.info");
  let uuid = uuidv1();
  return (
    <tr key={`rangee-${uuid}`}>
      <td className={"table-label"}>
        {props.label} {renderHelpIcon(props)}
      </td>

      <td className={props.value ? "" : "placeholder"}>
        {props.value || placeholder}
      </td>
    </tr>
  );
}

function renderHelpIcon(props) {
  return props.helpIcon ? (
    <img className={"help-icon"} src={helpIcon} alt={"SOS"}
      info={
        <InfoBulle
          text={props.t("flot.split.documente-ton-oeuvre.documenter.codeiswc-description")}
          pos={{ x: 220, y: 200 }}

        />
      }
    />


  ) : (
      <></>
    );
}
export default withTranslation()(Rangee)
