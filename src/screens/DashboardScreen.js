import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// Contexts
import WorkerContext from '../contexts/worker-context';

const DashboardScreen = (props) => {
    const workerCtx = useContext(WorkerContext);
    
    useEffect(() => {
        // Redirect to login screen if not logged in
        if(!workerCtx.loggedInWorker) {
            props.history.push('/login');
        }
    }, [workerCtx, props.history]);
    
    return <div className='bg-gradient'>
        <Container>
            <h1>Welcome, {workerCtx.loggedInWorker && workerCtx.loggedInWorker.name}</h1>
            <button className='btn_action my-5' onClick={() => props.history.push('/scanticket')}>Scan tickets</button>
            <button className='btn_action my-5' onClick={workerCtx.logout}>Logout</button>
        </Container>
    </div>
}

export default DashboardScreen;