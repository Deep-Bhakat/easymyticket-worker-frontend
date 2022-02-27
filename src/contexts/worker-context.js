import React from 'react';

const WorkerContext = React.createContext({
    loggedInWorker: {},
    login: () => {},
    loginError: null,
    loginData: {}
});

export default WorkerContext;