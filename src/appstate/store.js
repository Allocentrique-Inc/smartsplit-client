export class Observable {
	constructor() {
		Object.defineProperties(this, {
			subscriptions: {
				configurable: false,
				enumerable: false,
				writable: false,
				value: {},
			},

			subscriptionId: {
				configurable: false,
				enumerable: false,
				writable: true,
				value: 0,
			},
		})
	}

	subscribe(fn) {
		const id = this.subscriptionId++
		this.subscriptions[id] = fn

		return () => {
			delete this.subscriptions[id]
		}
	}

	notify(...args) {
		for (let k in this.subscriptions) {
			this.subscriptions[k](...args)
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
