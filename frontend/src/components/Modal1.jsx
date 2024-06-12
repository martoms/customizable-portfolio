import { Modal, Button } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const Modal1 = ({ showModal, setShowModal }) => {

    const handleClose = () => {
        setShowModal(false);
    };

    return ( 
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default Modal1;