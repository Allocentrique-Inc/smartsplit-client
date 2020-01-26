import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class ListeCollaborateurs extends Component {
  render() {
    const t = this.props.t
    return (      
      <div>
        <h1>{t("flot.split.tableaudebord.navigation.2")}</h1>
      </div>        
    )
  }
}
export default withTranslation()(ListeCollaborateurs)