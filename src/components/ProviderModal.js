import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import ProviderForm from './ProviderForm'

// This component provides a modal that will include the provider form
function ProviderModal(props) {
    return (
        <div>
            <Modal scrollable={true} dialogClassName='provider-modal' centered show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Provider Lookup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProviderForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProviderModal