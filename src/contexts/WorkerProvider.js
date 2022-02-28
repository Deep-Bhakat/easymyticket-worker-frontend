import React, { useState } from 'react';
import axios from 'axios';

import WorkerContext from './worker-context';

const WorkerProvider = (props) => {
    const [loggedInWorker, setLoggedInWorker] = useState(null);
    const [loginData, setLoginData] = useState(null);
    const [loginError, setLoginError] = useState(null);
    
    const login = async (username, password) => {
        try {
            console.log(process.env.REACT_APP_SERVER_URL);
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/worker/login`,
                { username: username, password: password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(res);
            setLoginData(res);
            setLoggedInWorker(res.data);
        }
        catch(error) {
            const serverError = error.response ? error.response.data.errorMessage : error.message;
            setLoginError(serverError);
        }
    }
    
    const logout = () => {
        setLoggedInWorker(null);
    }
    
    const workerContextValue = {
        loggedInWorker,
        login,
        loginError,
        loginData,
        logout
    };
    
    return <WorkerContext.Provider value={workerContextValue}>
        {props.children}
    </WorkerContext.Provider>
}

export default WorkerProvider;