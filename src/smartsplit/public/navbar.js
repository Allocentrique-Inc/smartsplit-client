import React from "react"
import LogoSmartSplit from '../../svg/logo-smartsplit'
import { Flex, Row } from "../../layout"

export default function PublicNavBar(props) {

    return <Row of="group" padding="group">
                <LogoSmartSplit />
                <Flex />
                {props.children}
        </Row>
}