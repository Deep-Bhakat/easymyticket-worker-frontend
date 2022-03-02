import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Contexts
import WorkerContext from './contexts/worker-context';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ScanTicketScreeen from './screens/ScanTicketScreen';
import TicketDetailsScreen from './screens/TicketDetailsScreen';

const App = () => {
	const workerCtx = useContext(WorkerContext);
	
	return <>
		<BrowserRouter>
			<Switch>
				{/* Root route / redirect */}
				<Route path='/' exact>
					{workerCtx.loggedInWorker ? <Redirect to='/login' /> : <Redirect to='dashboard' /> }
				</Route>
				<Route exact path='/login' component={LoginScreen} />
				<Route exact path='/dashboard' component={DashboardScreen} />
				<Route exact path='/scanticket' component={ScanTicketScreeen} />
				<Route exact path='/ticket' component={TicketDetailsScreen} />
			</Switch>
		</BrowserRouter>
	</>;
}

export default App;