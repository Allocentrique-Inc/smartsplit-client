import React from "react"

export function createPortal(name) {
	const Context = new React.createContext(new PortalManager())
	Context.displayName = name + ".Context"
	
	class Entrance extends PortalEntrance {}
	Entrance.displayName = name + ".Entrance"
	Entrance.contextType = Context
	
	class Exit extends PortalExit {}
	Exit.displayName = name + ".Exit"
	Exit.contextType = Context
	
	class Provider extends PortalProvider {}
	Provider.displayName = name + ".Provider"
	Provider.prototype.ContextProvider = Context.Provider
	
	function ExitProvider(props) {
		return <Provider>
			{props.children}
			<Exit />
		</Provider>
	}
	ExitProvider.displayName = name + ".ExitProvider"
	
	return { Provider, Entrance, Exit, ExitProvider }
}

export class PortalManager {
	constructor() {
		this.components = []
		this.exit = null
	}
	
	addComponent(component) {
		if(this.components.indexOf(component) < 0)
			this.components.push(component)
		
		this.renderComponent(component)
	}
	
	removeComponent(component) {
		const index = this.components.indexOf(component)
		
		if(index >= 0)
			this.components.splice(index, 1)
		
		this.renderComponent(component)
	}
	
	renderComponent(component) {
		if(this.exit)
			this.exit.forceUpdate()
	}
	
	setExit(exit) {
		this.exit = exit
	}
	
	unsetExit(exit) {
		if(this.exit === exit)
			this.exit = null
	}
	
	renderViews() {
		return this.components.map(c => c.props.children)
	}
}

class PortalProvider extends React.PureComponent {
	constructor(props) {
		super(props)
		this.manager = new PortalManager()
	}
	
	render() {
		const Provider = this.ContextProvider
		return <Provider value={this.manager}>{this.props.children}</Provider>
	}
}

class PortalEntrance extends React.PureComponent {
	componentDidMount() {
		this.context.addComponent(this)
	}
	
	componentDidUpdate() {
		this.context.renderComponent(this)
	}
	
	componentWillUnmount() {
		this.context.removeComponent(this)
	}
	
	render() {
		return null
	}
}

class PortalExit extends React.PureComponent {
	componentDidMount() {
		this.context.setExit(this)
	}
	
	componentWillUnmount() {
		this.context.unsetExit(this)
	}
	
	render() {
		return React.createElement(
			React.Fragment, 
			null,
			this.props.children,
			...this.context.renderViews()
		)
	}
}

const OverlayPortal = createPortal("Overlay")
export class Overlay extends React.PureComponent {
	static Portal    = OverlayPortal.Entrance
	static Container = OverlayPortal.Exit
	static Provider  = OverlayPortal.Provider
	static ProviderContainer = OverlayPortal.ExitProvider
	
	render() {
		if(this.props.render === false)
			return null
		
		return <OverlayPortal.Entrance>
			{this.props.visible !== false && this.props.children}
		</OverlayPortal.Entrance>
	}
}
