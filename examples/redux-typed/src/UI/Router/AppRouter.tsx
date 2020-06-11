import React, { ReactElement } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../Components/Home/Home';

export const history = createHistory();

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
const AppRouter = (): ReactElement => (
	<Router history={history}>
		<div>
			<Switch>
				<Route path='/' component={HomePage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;
