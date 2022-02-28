import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Container, Button } from 'react-bootstrap';

const ScanTicketScreeen = (props) => {
    
    const handleScan = (result, error) => {
        // If scan is successful, redirect to ticket details page and send the scanned ticket ID
        if(result) {
            props.history.push(`/ticket/?ticketID=${result.text}`);
        }
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
            
            <p className='text-center font-weight-bold pt-5'>Place the ticket QR code in the camera frame</p>
            <QrReader
                constraints={ { facingMode: 'environment' } }
                onResult={handleScan}
                scanDelay={100}
                videoContainerStyle={{ width: '100%', margin: 'auto' }}
            />
            
        </Container>
    </div>
}

export default ScanTicketScreeen;