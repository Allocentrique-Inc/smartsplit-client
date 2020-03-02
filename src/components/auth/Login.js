// eslint-disable-next-line
import { Identite, journal } from "../../utils/application"
import React, { Component } from "react"
import "./Login.scss"
import "../../assets/scss/connexion/connexion.scss"
import { withTranslation } from "react-i18next"
import { Formik, Form, Field } from "formik"
import Eye from "./Eye"
import { SmartSplitLogo } from "../svg/SVG.js"

// eslint-disable-next-line
const NOM = "LogIn"

class LogIn extends Component {
	constructor(props) {
		super(props)

		this.state = {
			pochette: props.pochette,
			hidden: true,
			username: "",
			password: this.props.password,
			parent: props.parent,
			vote: props.vote
		}

		this.toggleShow = this.toggleShow.bind(this)
	}

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				blankfield: false
			}
		})
	}

	handleSubmit = values => {
		this.setState({ patience: true }, () => {
			Identite.connexion(
				{ utilisateur: values.username, secret: values.password },
				(connexion = true) => {
					if (connexion && this.props.fn) {
						this.props.fn()
					}
					this.setState({ patience: false })
				}
			)
		})
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value })
	}

	toggleShow(e) {
		e.preventDefault()
		this.setState({ hidden: !this.state.hidden })
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.password !== nextProps.password) {
			this.setState({ password: nextProps.password })
		}
		if (this.props.parent !== nextProps.parent) {
			this.setState({ parent: nextProps.parent })
		}
		if (this.props.vote !== nextProps.vote) {
			this.setState({ vote: nextProps.vote })
		}
	}

	render() {
		const t = this.props.t,
			i18n = this.props.i18n
		let pochette = this.state.pochette ? "pochette" : ""
		return (
			<>
				<div className="fixed-top welcome">
					<span
						className={
							"ui container welcome" + (this.props.pochette ? "pochette" : "")
						}
					>
						<div className="left">
							<SmartSplitLogo />
						</div>
						<div className={`right ${pochette}`}>
							<div className="medium-400 not-yet">
								{t("flot.split.inscription.pasencore")}
							</div>
							<div
								className="medium-500 register"
								onClick={() => {
									// Le paramètre de la fonction afficher est le TYPE_ dans le fichier Connexion.js
									this.props.parent.afficher(1)
								}}
							>
								{t("flot.split.inscription.compte")}
							</div>
							{this.props.i18n.language && (
								<>
									{this.props.i18n.language.substring(0, 2) === "en" && (
										<div
											className={`ui negative button language ${pochette}`}
											onClick={() => {
												this.props.i18n.init({ lng: "fr" })
											}}
										>
											Français
										</div>
									)}
									{this.props.i18n.language.substring(0, 2) === "fr" && (
										<div
											className={`ui negative button language ${pochette}`}
											onClick={() => {
												this.props.i18n.init({ lng: "en" })
											}}
										>
											English
										</div>
									)}
								</>
							)}
						</div>
					</span>
				</div>

				<Formik
					initialValues={{
						username: this.state.username,
						password: ""
					}}
					onSubmit={(values, { setSubmitting }) => {
						this.handleSubmit(values, () => {
							setSubmitting(false)
						})
					}}
				>
					{({ errors, touched, isValidating }) => (
						<Form>
							{this.state.patience && (
								<div className="container ui active dimmer">
									<div className="ui text loader">{t("entete.encours")}</div>
								</div>
							)}
							{!this.state.patience && (
								<div>
									{!this.state.vote && <></>}

									<header id="loginHeader">
										{i18n.language && i18n.language.substring(0, 2) === "en" && (
											<div>
												{!this.state.vote && (
													<h1>
														Login to your{" "}
														{this.state.pochette ? "Pochette" : "Smartsplit"}{" "}
														<br />
														account
													</h1>
												)}
												{this.state.vote && <h1>Login to confirm your vote</h1>}
												<br></br>
											</div>
										)}
										{i18n.language && i18n.language.substring(0, 2) !== "en" && (
											<div className="loginHeader">
												{!this.state.vote && (
													<h1>
														Connecte-toi à ton <br />
														compte{" "}
														{this.state.pochette ? "Pochette" : "Smartsplit"}
													</h1>
												)}
												{this.state.vote && (
													<h1>
														Connecte-toi <br />
														pour confirmer ta décision
													</h1>
												)}
												<br></br>
											</div>
										)}
									</header>

									<section className="section auth">
										<div className="container">
											<h1>{this.props.message}</h1>
											<div className="field">
												<div className="input-wrapper">
													<div className="control">
														<label htmlFor="username">
															{t("accueil.courriel")}
														</label>
														<Field
															name="username"
															id="username"
															aria-describedby="usernameHelp"
															placeholder={t("flot.split.inscription.exemple")}
															required={true}
														/>
														{errors.username && touched.username && (
															<div
																style={{
																	color: "red",
																	position: "absolute",
																	top: "70px"
																}}
															>
																{" "}
																{t(
																	"flot.split.inscription.email-invalide"
																)}{" "}
															</div>
														)}
													</div>
												</div>
												<div className="field">
													<div className="control has-icons-left">
														<label htmlFor="password">
															{t("accueil.motdepasse")}
														</label>
														<div className="input-wrapper">
															<Field
																type={this.state.hidden ? "password" : "text"}
																id="password"
																name="password"
																placeholder=""
																required={true}
															/>

															<button
																type="button"
																id="hide"
																tabIndex="-1"
																onClick={e => {
																	this.toggleShow(e)
																}}
															>
																<Eye
																	actif={this.state.hidden}
																	id="hide"
																	onClick={e => {
																		this.toggleShow(e)
																	}}
																/>
															</button>
														</div>
													</div>
												</div>
												{!this.state.patience && (
													<div className="field">
														<div className="control">
															<div
																onClick={() => {
																	if (this.state.parent) {
																		this.state.parent.afficher(2)
																	}
																}}
																className={`motdepasse-oublie ${pochette}`}
															>
																{t("accueil.oublie")}
															</div>
														</div>
													</div>
												)}

												<div className="field">
													<p className="control">
														<button
															className={`ui medium button login is-success ${pochette}`}
														>
															{t("entete.connexion")}
														</button>
													</p>
												</div>
											</div>
										</div>
									</section>
								</div>
							)}
						</Form>
					)}
				</Formik>
			</>
		)
	}
}

export default withTranslation()(LogIn)
