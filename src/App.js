import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Screens
import LoginScreen from './screens/LoginScreen';


const App = () => {
	return <>
		<BrowserRouter>
			<Switch>
				<Route exact path='/login' component={LoginScreen} />
			</Switch>
		</BrowserRouter>
	</>;
}

export default App;