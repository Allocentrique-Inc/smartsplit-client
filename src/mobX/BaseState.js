import { observable, action, computed, flow as asyncAction } from "mobx"

export default class BaseState {
	root

	/**
	 * Le constructeur initialize la connection aux root store
	 * et initialise l'hydration des valuers via Local Storage
	 * de la plateforme
	 *
	 * @param rootStore l'objet de state qui contient toutes
	 *                  les autres pour accéder aux autres branches
	 */
	constructor(rootStore) {
		this.root = rootStore
		this.loadState()
	}

	@action
	async loadState() {}

	@action
	async saveState() {}
}
