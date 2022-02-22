import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {ReactComponent as  WorkerLogo} from '../assets/worker-logo-white.svg';
// Module CSS file
import styles from './LoginScreen.module.css';

const LoginScreen = () => {
    return (
        <div className={`screen bg-gradient d-flex flex-column align-items-center`}>
            <h1 className={styles.logo_top}>EaseMyTicket</h1>
            
            {/* Login form area */}
            <div className={`text-center ${styles.login_area}`}>
                {/* Worker logo SVG */}
                <WorkerLogo />
                
                {/* Login form */}
                <Form className='mt-5'>
                    <Form.Group className="mb-4">
                        <Form.Control type="text" placeholder="Login ID" />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button type="submit" className={styles.btn_action}>Login</Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginScreen;