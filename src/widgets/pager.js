import React from "react"

export function Pager(props) {
	const { page } = props
	let children = null
	
	React.Children.forEach(props.children, child => {
		if(child.key === page)
			children = child
	})
	
	return children
}

export function MultiPager(props) {
	return React.Children.map(
		props.children,
		child => props[child.key] ? child : null
	) 
}

export default Pager
