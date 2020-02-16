import Form from "react-bootstrap/Form";
import React from "react";
import FormWrapper from "./FormWrapper";

export interface I_props {
    name: string,
    label: string,
    type: string
    meta: {
        handleChange: any,
        values: any,
        touched: any,
        errors: any
    };
}

export const CreateField = ({name, label, meta, type}:I_props) => {
    return (
        <FormWrapper name={name} error={meta.errors[name]} label={label} key={name}>
            <Form.Control
                type={type}
                name={name}
                placeholder={label}
                value={meta.values[name] || ''}
                onChange={meta.handleChange}
                isInvalid={!!(meta.touched[name] && meta.errors[name])}
            />
        </FormWrapper>
    )
}
