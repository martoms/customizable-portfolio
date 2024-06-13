/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';

const Modal1 = ({ showModal, setShowModal, modalData }) => {

    const handleClose = () => {
        setShowModal(false);
    };

    const { title, body, author } = modalData;

    return ( 
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title> { title } </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>  { body }  </p>
                    <p>  { author }  </p>
                </div>
            </Modal.Body>
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