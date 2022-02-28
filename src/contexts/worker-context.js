import React from 'react';

const WorkerContext = React.createContext({
    loggedInWorker: null,
    login: () => {},
    loginError: null,
    loginData: {},
    logout: () => {}
});

export default WorkerContext;