import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Alert, ListGroup, Form, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';
import WorkerContext from '../contexts/worker-context';

const TicketDetailsScreen = (props) => {
    const [loading, setLoading] = useState();
    const [ticketDetails, setTicketDetails] = useState({});
    const [ticketError, setTicketError] = useState(null);
    const [selectedToAdmit, setSelectedToAdmit] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [admitError, setAdmitError] = useState();
    
    const workerCtx = useContext(WorkerContext);
    
    // Extracting the ticket ID
    const ticketID = props.location.search.split('=')[1];

    // console.log(ticketID);
    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${workerCtx.loggedInWorker.token}` } };
                setLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/ticket/${ticketID}`, config);
                setLoading(false);
                console.log(res);
                setTicketDetails(res.data.ticket);
            }
            catch (error) {
                console.log('Error');
                console.log(error);
                console.log(error.response);
                // setTicketError(error.response.data.errorMessage);
                // console.log(error.response);
            }
        }
        fetchTicketDetails();
    }, []);

    // Admit visitors
    const handleAdmitVisitors = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${workerCtx.loggedInWorker.token}` } };
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/ticket/admitEntry`, {
                ticketId: ticketID,
                noOfVisitorsEntered: selectedToAdmit
            }, config);
            setAdmitError(false);
            setShowModal(true);
        }
        catch(error) {
            console.log(error.response);
            setAdmitError(true);
            setShowModal(true);
        }
    }
    
    // Modal handlers
    const handleShow = () => {
        setShowModal(true);
    }
    const handleClose = () => {
        setShowModal(false);
    }

    return <div className='bg-gradient'>
        <Container>
            {/* Go back button */}
            <Button
                className='btn_minor'
                onClick={props.history.goBack}
            >
                Go back
            </Button>
            <div className='my-5'>
                <h4>Ticket ID: {ticketID}</h4>
                {ticketError && <Alert variant='danger'>{ticketError}</Alert>}
                
                {/* Loading spinner */}
                {loading && <Spinner animation='border'/>}
                
                {/* If ticket is used */}
                {(!loading && ticketDetails.noOfVisitors === ticketDetails.noOfVisitorsEntered) && <Alert variant='danger'>Ticket is used!</Alert>}

                {ticketDetails && (
                    <ListGroup className='black_txt'>
                        <ListGroup.Item className='d-flex justify-content-between'>
                            <strong>Booked by: </strong>
                            <span>{ticketDetails.userId}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'>
                            <strong>Date of visit: </strong>
                            <span>{ticketDetails.visitDate}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'>
                            <strong>Total visitors:</strong>
                            <span>{ticketDetails.noOfVisitors}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'>
                            <span>Adults: {ticketDetails.noOfAdults}</span>
                            <span>Children: {ticketDetails.noOfKids}</span>
                            <span>Foreigners: {ticketDetails.noOfForeigners}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'>
                            <strong>Entered visitors:</strong>
                            <span>{ticketDetails.noOfVisitorsEntered}</span>
                        </ListGroup.Item>
                    </ListGroup>
                )}

                {/* Dropdown to select no. of visitors and admit button */}
                {ticketDetails.noOfVisitors !== ticketDetails.noOfVisitorsEntered && (
                    <div className='mt-5'>
                        <Form.Label>Select visitors to admit: </Form.Label>
                        <Form.Control
                            as='select'
                            value={selectedToAdmit}
                            onChange={(e) => setSelectedToAdmit(e.target.value)}
                        >
                            {[...Array(ticketDetails.noOfVisitors - ticketDetails.noOfVisitorsEntered).keys()].map((num) => {
                                return <option key={num + 1} value={num + 1}>{num + 1}</option>
                            })}
                        </Form.Control>
                        <button
                            className='btn_action mt-3'
                            onClick={handleAdmitVisitors}
                        >
                            Admit {selectedToAdmit} visitor(s)
                        </button>
                    </div>
                )}
            </div>
        </Container>
        
        {/* Modal */}
        <Modal show={showModal} onHide={handleClose} className='black_txt' backdrop='static'>
            <Modal.Header>
                <Modal.Title>{admitError ? 'Error' : 'Admitted'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert
                    variant={admitError ? 'danger' : 'success'}
                >
                    <h4>{admitError ? 'Error admitting users' : `Admitted ${selectedToAdmit} visitor(s)`}</h4>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={props.history.goBack}
                >
                    Scan more tickets
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default TicketDetailsScreen;