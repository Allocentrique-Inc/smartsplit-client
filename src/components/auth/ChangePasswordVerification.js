import React from "react";
import { Translation } from "react-i18next";
import { Modal } from "semantic-ui-react";

const ChangePasswordVerification = () => (
  // <React.Fragment>
  <Translation>
    {t => (
      <section className="section auth">
        <div className="container">
          <tbody style={{ FontFamily: "IBM Plex Sans", fontSize: "16px" }}>
            <tr>
              <td>
                <h2>
                  &nbsp;&nbsp;{t("flot.split.auth.passwordchanged.titre")}
                </h2>

                <p>{t("flot.split.auth.passwordchanged.indication")}</p>
              </td>
            </tr>
          </tbody>
        </div>
      </section>
    )}
  </Translation>
  // </React.Fragment>
);

export default ChangePasswordVerification;
