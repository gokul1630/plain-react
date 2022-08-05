const React = {
	createElement(tag, props, ...children) {
		const element = { tag, props: { ...props, children } }
		if (typeof tag === 'function') {
			return tag(props)
		}
		return element
	},
}

let cursorIndex = 0
let states = []

const useState = (initialState) => {
	const fronzenCursor = cursorIndex

	console.log(states[fronzenCursor],initialState)
	states[fronzenCursor] = states[fronzenCursor] || initialState
	const setState = (newState) => {
		states[fronzenCursor] = newState
		rerender()
	}
	cursorIndex++
	return [states[fronzenCursor], setState]
}

const App = ({ name }) => {
	const [user, setUser] = useState(name)

	return (
		<div>
			<h1>{user}</h1>
			<input type='text' placeholder='placeholder' onchange={(e) => setUser(e.target.value)} />
		</div>
	)
}

const render = (element, container) => {
	const actualElement = document.createElement(element.tag)

	if (['string', 'numbers'].includes(typeof element)) {
		return container.appendChild(document.createTextNode(element))
	}

	if (element.props) {
		Object.keys(element.props)
			.filter((prop) => prop !== 'children')
			.forEach((prop) => {
				return (actualElement[prop] = element.props[prop])
			})
	}

	if (element.props.children) {
		element.props.children.forEach((child) => render(child, actualElement))
	}

	container.appendChild(actualElement)
}

render(<App name='plain react' />, document.getElementById('app'))

const rerender = () => {
	cursorIndex = 0
	document.getElementById('app').firstChild.remove()
	render(<App name='plain react' />, document.getElementById('app'))
}
