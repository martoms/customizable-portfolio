/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';

const Modal1 = ({ showModal, setShowModal, modalData }) => {

    const handleClose = () => {
        setShowModal(false);
    };

    const { title, body, attrib } = modalData;

    return ( 
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title> { title } </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { body }
            </Modal.Body>
            <Modal.Footer>
                { attrib }
            </Modal.Footer>
        </Modal>
    );
}
 
export default Modal1;