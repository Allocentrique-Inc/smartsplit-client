import React, { Component } from "react"
import { Translation } from "react-i18next"

import "../../assets/scss/menu-profil.scss"

import axios from "axios"

import { toast } from "react-toastify"
import { Dropdown } from "semantic-ui-react"

import i18n from "i18next"

import { Identite } from "../../utils/application"
//import Socan from "../auth/Socan"

import {
	LogOutSVG,
	SettingsSVG,
	AvatarInitialsSVG,
	ChevronDownSVG,
	LangueSVG
} from "../svg/SVG"

const textToImage = require("text-to-image")

class MenuProfil extends Component {
	constructor(props) {
		super(props)
		if (props.onRef) {
			// Permet de tenir une référence à la fonction de déconnexion dans l'en-tête qui inclut
			props.onRef(this)
		}
		this.state = {
			auth: props.user,
			angle: "down",
			initials: "",
			user: undefined
		}
		this.deconnexion = this.deconnexion.bind(this)
		this.ouvrirSocan = this.ouvrirSocan.bind(this)
	}

	componentWillMount() {
		axios
			.get(
				"http://dev.api.smartsplit.org:8080/v1/rightHolders/" +
					this.state.auth.username
			)
			.then(res => {
				this.setState({ user: res.data.Item })

				let P = "",
					N = ""
				if (res.data.Item.firstName && res.data.Item.firstName.length > 0)
					P = res.data.Item.firstName.charAt(0).toUpperCase()
				if (res.data.Item.lastName && res.data.Item.lastName.length > 0)
					N = res.data.Item.lastName.charAt(0).toUpperCase()

				this.setState(
					{
						initials: P + N
					},
					() => {
						textToImage.generate(this.state.initials).then(dataUri => {
							this.setState({ avatarInitiales: dataUri })
						})
					}
				)
			})
			.catch(err => {
				toast.error(err.message)
			})
	}

	deconnexion() {
		Identite.deconnexion()
			.then(data => {
				setTimeout(() => {
					window.location.href = "/accueil"
				}, 1000)
			})
			.catch(error => toast.error("Erreur..."))
	}

	ouvrirSocan(val = true) {
		this.setState({ modaleSocan: val })
	}

	render() {
		let avatarImage
		let userInitials
		let nomComplet
		if (this.state.user) {
			//avatarLink = this.state.user.avatarS3Etag // avatarS3Etag taken as full url instead of Etag
			avatarImage =
				this.state.user.avatarImage === null ||
				this.state.user.avatarImage === "image.jpg"
					? !this.props.pochette
						? ""
						: "https://images-publiques.s3.amazonaws.com/avatar.png"
					: `https://smartsplit-images.s3.us-east-2.amazonaws.com/${this.state.user.avatarImage}`
			userInitials =
				this.state.user.avatarImage === null ? this.state.initials : null
			nomComplet = this.state.user.artistName
				? this.state.user.artistName
				: `${this.state.user.firstName} ${this.state.user.lastName}`
		}

		let menu = (
			<Translation>
				{t => (
					<span>
						<Dropdown text="" icon={<ChevronDownSVG />} className="down angle">
							<Dropdown.Menu>
								<Dropdown.Item
									onClick={() => (window.location.href = "/accueil")}
								>
									<React.Fragment>
										<div className="custom-initials-holder">
											{this.state.user && avatarImage && (
												<img
													className="ui image rounded"
													src={avatarImage}
													alt={`${this.state.user.firstName} ${this.state.user.lastName}`}
												/>
											)}
											{this.state.user && !avatarImage && (
												<>
													<AvatarInitialsSVG />
													<span className="custom-initials">
														{this.state.initials}
													</span>
												</>
											)}
										</div>
										<span className="text nom">{nomComplet}</span>
									</React.Fragment>
								</Dropdown.Item>
								{i18n.language && i18n.language.substring(0, 2) === "en" && (
									<Dropdown.Item
										onClick={() => {
											i18n.init({ lng: "fr" })
										}}
									>
										<React.Fragment>
											<div className="custom-initials-holder">
												<span className="custom-initials">FR</span>
											</div>
											<span className="text">{t("menuprofil.francais")}</span>
										</React.Fragment>
									</Dropdown.Item>
								)}
								{i18n.language && i18n.language.substring(0, 2) === "fr" && (
									<Dropdown.Item
										onClick={() => {
											i18n.init({ lng: "en" })
										}}
									>
										<React.Fragment>
											<div className="custom-initials-holder">
												<span className="custom-initials">EN</span>
											</div>
											<span className="text">{t("menuprofil.anglais")}</span>
										</React.Fragment>
									</Dropdown.Item>
								)}

								{/* <Dropdown.Item
                  content={nomComplet}
                  text={this.state.initials}
                  image={<AvatarInitialsSVG />}
                /> 

                  <Dropdown.Item
                  text={t("menuprofil.profil")}
                  onClick={() => {
                    this.ouvrirSocan();
                  }}
                /> */}
								<Dropdown.Divider />

								{i18n.language && i18n.language.substring(0, 2) === "en" && (
									<Dropdown.Item
										className="langue"
										text={t("menuprofil.francais")}
										image={<LangueSVG />}
										onClick={() => {
											i18n.init({ lng: "fr" })
										}}
									/>
								)}
								{i18n.language && i18n.language.substring(0, 2) === "fr" && (
									<Dropdown.Item
										className="langue"
										text={t("menuprofil.anglais")}
										image={<LangueSVG />}
										onClick={() => {
											i18n.init({ lng: "en" })
										}}
									/>
								)}

								<Dropdown.Item
									className="parametre"
									text={t("menuprofil.parametre")}
									image={<SettingsSVG />}
									onClick={() => {
										window.location.href = "/parametre" // À faire
									}}
								/>

								<Dropdown.Item
									className="deconnexion"
									text={t("menuprofil.deconnexion")}
									image={<LogOutSVG />}
									onClick={() => {
										this.deconnexion()
									}}
								/>
							</Dropdown.Menu>
						</Dropdown>
					</span>
					/*  <Socan
              pochette={this.props.pochette}
              open={this.state.modaleSocan}
              onClose={() => {
                this.ouvrirSocan(false);
              }}
            /> */
				)}
			</Translation>
		)

		return (
			<Translation>
				{t => (
					<>
						{/*<div className="ui five wide column avatar--image profile"></div>
            <Label>
              {nomComplet}
            </Label> */}
						{!userInitials && (
							<div className="custom-initials-holder2">
								{this.state.user && avatarImage && (
									<img
										width="30"
										className="ui image rounded"
										src={avatarImage}
										alt={`${this.state.user.firstName} ${this.state.user.lastName}`}
									/>
								)}
								{this.state.user && !avatarImage && (
									<>
										<AvatarInitialsSVG />
										<span className="custom-initials">
											{this.state.initials}
										</span>
									</>
								)}
							</div>
						)}
						{menu}
					</>
				)}
			</Translation>
		)
	}
}

export default MenuProfil
