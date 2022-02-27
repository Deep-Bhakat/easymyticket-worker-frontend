import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

const App = () => {
	return <>
		<BrowserRouter>
			<Switch>
				<Route exact path='/login' component={LoginScreen} />
				<Route exact path='/dashboard' component={DashboardScreen} />
			</Switch>
		</BrowserRouter>
	</>;
}

export default App;