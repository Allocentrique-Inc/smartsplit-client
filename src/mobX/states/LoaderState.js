import BaseState, { save, session } from "../BaseState"
import { Loader } from "@googlemaps/js-api-loader"
import {
	observable,
	computed,
	action,
	when,
	reaction,
	runInAction,
	toJS,
} from "mobx"

/**
 * This class is used to manage assets, scripts, sdks, apis etc that cannot
 * be included directly but must be
 */
export default class LoaderState extends BaseState {
	@observable googleApiReady = false
}
