import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ScanTicketScreeen from './screens/ScanTicketScreen';

const App = () => {
	return <>
		<BrowserRouter>
			<Switch>
				<Route exact path='/login' component={LoginScreen} />
				<Route exact path='/dashboard' component={DashboardScreen} />
				<Route exact path='/scanticket' component={ScanTicketScreeen} />
			</Switch>
		</BrowserRouter>
	</>;
}

export default App;