import React, { useState, useMemo } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { toJS } from "mobx"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import { observer } from "mobx-react"
import { CardStyles } from "../../../widgets/card"
import { Form, RadioGroup, RadioGroupButton, FileField } from "../../../forms"
import TextField from "../../../forms/text"

const Styles = StyleSheet.create({
    category: {
        alignItems: "center",
        display: "flex",
    },
    logo: {
        marginRight: Metrics.spacing.component,
    },
    frame: {
        backgroundColor: Colors.background.underground,
    },
    frame_error: {
        borderWidth: 1,
        borderColor: Colors.error,
        borderStyle: "solid",
    },
    frame_yourself: {
        borderWidth: 1,
        borderColor: Colors.secondaries.teal,
    },
    option_text: {
        marginLeft: "8%"
    }
})

const frameStyle = [CardStyles.frame, Styles.frame]


const SelectionPage = observer(() => {
    const { t } = useTranslation()
    const workpiece = useCurrentWorkpiece()
    const workpieceId = workpiece.id
    const [files, setFiles] = useState([])// useCurrentWorkpiece("files", "$all")
    const [versionType, setVersionType] = useState("")
    const [demoName, setDemoName] = useState("");
    const [fileId, setFileId] = useState("");
    const [file, setFile] = useState(null);

    const handleChangeVersionType = (val) => {
        setVersionType(val)
    }

    const onChangeFile = (val) => {
        console.log("val", val);
        setFile(val);
    }

    return (
        <Row>
            <Column of="group" flex={5}>
                <Column of="section" flex={6}>
                    <Column of="component">
                        <Heading level={1}>
                            Quelle version de l'oeuvre aimerais-tu protéger?
				</Heading>
                        <Paragraph>
                            Ici, tu envoies ton oeuvre dans un encodeur informatique.
				</Paragraph>
                        <Paragraph>
                            L'algorithme derrière cette page prendra ton oeuvre et créera à partir
					d'elle une empreinte numérique unique que l'on nomme un <i>hash</i>.
				</Paragraph>
                    </Column>

                    <Column of="component">
                        <Heading level={3}>Fichier à protéger</Heading>

                        <RadioGroup name="file_id" value={fileId} onChange={setFileId}>
                            <Column of="inside">
                                {files.map((file) => (
                                    <FileRadioButton key={file.data.file_id} file={file} />
                                ))}

                                <RadioGroupButton value="another">
                                    <Flex>
                                        <FileField
                                            name="file_upload"
                                            label="Ajouter un fichier"
                                            undertext="Tous formats acceptés, 2 Mo maximum."
                                            onFileChange={onChangeFile}
                                        />
                                    </Flex>
                                </RadioGroupButton>
                            </Column>
                        </RadioGroup>
                    </Column>

                    <Hairline />

                    <Column of="component">
                        <Heading level={3}>Version de travail</Heading>
                        <RadioGroup name="versionType" value={versionType} onChange={handleChangeVersionType}>
                            <Column of="inside">
                                <RadioGroupButton value="idea" label="Idée" />
                                <RadioGroupButton value="demo" label="Démo" />
                                {versionType === "demo" && <Column style={Styles.option_text}>
                                    <Heading level={5}>Choisis un nom personnalisé</Heading>
                                    <Flex>
                                        <TextField value={demoName} onChange={setDemoName} />
                                    </Flex>
                                </Column>}

                                <RadioGroupButton value="rough-mix" label="Rough Mix" />
                                <RadioGroupButton
                                    value="final-master"
                                    label="Version finale (masterisée)"
                                />
                            </Column>
                        </RadioGroup>
                    </Column>
                </Column>
            </Column>
            <Flex />
            <Column of="group" flex={5}>
                <Column of="component" padding="component" layer="underground">
                    <Column of="inside">
                        <Text small bold tertiary>
                            AIDE
    					</Text>
                        <Hairline />
                    </Column>

                    <Heading level={4}>Pourquoi protéger mon oeuvre?</Heading>

                    <Text secondary>
                        Enregistrer son oeuvre sur la blockchain avec <i>Smartsplit</i> est
    					équivalent à se l'envoyer par courrier recommandé à soi-même afin de
    					pouvoir démontrer au besoin sa paternité
    				</Text>
                </Column>
            </Column>
        </Row>
    )
})
export default SelectionPage

function FileRadioButton({ file }) {
    const data = useSubpath(file, "data")
    return <RadioGroupButton value={data.file_id} label={data.name} />
}
