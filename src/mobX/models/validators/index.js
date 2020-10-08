import { getEmail } from "../../../../api/users"

/**
 * this file contains a series of exports of both synchronous and asynchronous field validators
 *
 * validators have two function parameters. the field value and the containing model
 * (value,model)=>string:null
 *
 * synchronous validators are called every time a field in a the model changes
 * this is done because any validator can depend on the value of another field
 * this it is not enough for it to be called only when it's own value changes
 * thus make the function fast -- no server calls
 *
 * async validators are called only when the model's validate function is called
 * this usually happens when a submit button is clicked. These functions are the
 * appropriate to check for uniqueness and do calls to the server
 *
 */

/**
 * validates email addresses by regular expression
 * @param value {string} the email address to validate
 * @return {string|null} returns error message or null if valid
 */
export function emailValidator(value: string) {
	let success = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
		value
	)
	if (!success) return "errors:invalidEmail"
	return null
}

/**
 * validates the email against existing users with this email on the server
 * @param value {string} the email address to be validated
 * @return {Promise<string|null>} error message or null if valid
 */
export async function emailUniqueValidator(value) {
	try {
		await getEmail(value)
		return "errors:emailTaken"
	} catch (e) {
		return null
	}
}

/**
 * password complexity validator when creating passwords
 * @param value
 * @return {string}
 */
export function passwordValidator(value, model) {
	if (value.length < 8) {
		return "errors:strengthPassword"
	}
}

/**
 * validates the value against the password field
 *
 * validator assumes that the field name of the password to compare is "password"
 * @param value
 * @param model
 * @return {string}
 */
export function samePasswordValidator(value, model) {
	if (value !== model.password.value) {
		return "errors:samePasswords"
	}
}

/**
 * bitwise combination value :
 *  1 2 4 (BIT)
 *  -------------------
 *  0 0 0 none                  = 0
 *  1 0 0 email only            = 1
 *  0 1 0 mobile only           = 2
 *  1 1 0 email + mobile        = 3
 *  0 0 1 sms only              = 4
 *  1 0 1 email + sms           = 5
 *  0 1 1 mobile + sms          = 6
 *  1 1 1 email, mobile + sms   = 7
 
 * @return {string || null}
 */
export function NotificationValidator(v) {
	if (v > 7 || v < 0) return "invalid_notification_setting"
	else return null
}
