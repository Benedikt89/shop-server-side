import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {FieldInputProps, FormikProps} from "formik";

interface I_formWrapperProps {
    label: string,
    name: string,
    form: FormikProps<any>,
    field: FieldInputProps<any>,
    type?: string,
    props: FormikProps<any>
}

export const FormWrapper = ({
                                label,
                                name,
                                form,
                                field,
                                type,
                                ...props
                            }: I_formWrapperProps) => {
    let {touched, errors, handleChange} = form;
    errors && console.log(errors[field.name]);
    let typeForField = type ? type : 'text';
    return (
        <Form.Group as={Col} md="12" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={typeForField}
                placeholder={label}
                {...field}
                {...props}
                onChange={ handleChange }
                isInvalid={ touched[field.name] && !!errors[field.name] }
                isValid={ touched[field.name] && !errors[field.name] }
            />
            <Form.Control.Feedback type="invalid">
                {errors[field.name]}
            </Form.Control.Feedback>
            <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
    )
};

export default FormWrapper;