import React, {ReactNode, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface I_Props {
    title?: string
    visible: boolean
    onHide: () => void
    acceptCallback?: () => void
    children?: ReactNode
}

const WithModal: React.FC<I_Props> = (props: I_Props) => {
    return (
    <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
};

export default WithModal;