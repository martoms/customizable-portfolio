/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";

const Settings = ({showModal, setShowModal, form}) => {

    const handleClose = () => {
        setShowModal(false);
    };

    return ( 
        <Modal className="settings" show={showModal} onHide={handleClose}>
            <Modal.Body>
                { form }
            </Modal.Body>
        </Modal>
    );
}
 
export default Settings;