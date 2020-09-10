export const $subscriptions = Symbol("Subscriptions")

export class Observable {
	constructor() {
		this[$subscriptions] = {
			subscribers: {},
			id: 0,
		}
	}

	subscribe(fn) {
		const id = this[$subscriptions].id++
		this[$subscriptions].subscribers[id] = fn

		return () => {
			delete this[$subscriptions].subscribers[id][id]
		}
	}

	notify(...args) {
		for (let k in this[$subscriptions].subscribers) {
			this[$subscriptions].subscribers[k](...args)
		}
	}

	set(data) {
		for (let k in data) {
			this[k] = data[k]
		}

		this.notify("set", data)
	}

	setData(data) {
		Object.assign(this.data, data)
		this.notify("set", { data })
	}
}
