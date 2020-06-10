export class Store {
	constructor(...protoInjectors) {
		const proto = { store: this }

		for (let injector of protoInjectors) {
			Object.assign(proto, injector)
		}

		Object.defineProperty(this, "proto", {
			configurable: false,
			enumerable: false,
			writable: false,
			value: Object.freeze(proto),
		})
	}

	// TODO: subscribe/notify the whole store?
	// TODO: path invalidation?

	bindClass(cls) {
		class StoreBound extends cls {
			constructor(...args) {
				super(...args)
			}
		}

		Object.assign(StoreBound.prototype, this.proto)

		return StoreBound
	}

	bindClasses(classes) {
		const bound = {}

		for (let key in classes) {
			bound[key] = this.bindClass(classes[key])
		}

		return bound
	}

	bindFunction(fn) {
		return fn.bind(this.proto)
	}
}

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
}
