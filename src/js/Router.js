import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from './components/App'
import NotFound from './components/NotFound'

const AppRouter = () => (
	<Router>
		<Switch>
			<Route path="/" exact component={App} />
			<Route component={NotFound} />
		</Switch>
	</Router>
)
export default AppRouter
