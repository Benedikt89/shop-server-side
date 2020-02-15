import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

interface I_formWrapperProps {
    label: string
    name: string
    error: string | undefined
    children: any
}

export const FormWrapper = ({
                                     label, name, error,
                                     children
                                 }: I_formWrapperProps) => {
    return (
        <Form.Group as={Col} md="12" controlId={name}>
            <Form.Label>{label}</Form.Label>
            {children}
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
)
};

export default FormWrapper;