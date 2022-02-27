import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import {ReactComponent as  WorkerLogo} from '../assets/worker-logo-white.svg';
import { Alert } from 'react-bootstrap';

// Module CSS file
import styles from './LoginScreen.module.css';

// Contexts
import WorkerContext from '../contexts/worker-context';

const LoginScreen = (props) => {
    // Form field values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Worker context
    const workerCtx = useContext(WorkerContext);
    const [loginError, setLoginError] = useState(workerCtx.loginError);
    
    useEffect(() => {
        // Redirect to dashboard after login
        if(workerCtx.loggedInWorker) {
            props.history.push('/dashboard');
        }
        // Updating login error state
        setLoginError(workerCtx.loginError)
    }, [workerCtx, props.history]);
    
    // Login handler
    const loginHandler = (e) => {
        e.preventDefault();
        workerCtx.login(username, password);
    }
    return (
        <div className={`screen bg-gradient d-flex flex-column align-items-center`}>
            <h1 className={styles.logo_top}>EaseMyTicket</h1>
            
            {/* Login form area */}
            <div className={`text-center ${styles.login_area}`}>
                {/* Worker logo SVG */}
                <WorkerLogo />
                
                {/* Login form */}
                <Form className='mt-5' onSubmit={loginHandler}>
                {loginError && <Alert variant='danger'>Invalid username or password</Alert>}
                    <Form.Group className="mb-4">
                        <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    
                    <Button type="submit" className={styles.btn_action}>Login</Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginScreen;