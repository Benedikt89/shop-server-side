import React from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withFormik, FormikProps, InjectedFormikProps } from 'formik';
import FormWrapper from "../../../Common/FormWrapper";
import {I_loginData} from "../../auth-types";

const schema = yup.object({
    phone: yup
        .string()
        .when('country', {
            is: country => ["United States", "Canada"].includes(country),
            then: yup.string().matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone number')
        })
        .required(),
    password: yup.string().required('Password name is required'),
});

interface OtherProps {
    message: string;
}

const InnerForm:React.SFC< InjectedFormikProps<OtherProps, I_loginData> > =
    (props: OtherProps & FormikProps<I_loginData>) => {

    const { touched, errors, isSubmitting, message, handleSubmit, handleChange, values } = props;
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <h1>{message}</h1>
            <FormWrapper label={'phone'} error={errors.phone} name={'phone'}>
                <Form.Control
                    type="text"
                    name="phone"
                    placeholder="First Name"
                    value={values.phone || ''}
                    onChange={handleChange}
                    isInvalid={!!(touched.phone && errors.phone)}
                />
            </FormWrapper>
            <FormWrapper label={'Password'} error={errors.password} name={'password'}>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="****"
                    value={values.password || ''}
                    onChange={handleChange}
                    isInvalid={!!(touched.password && errors.password)}
                />
            </FormWrapper>
            <Button type="submit" disabled={isSubmitting}>
                Submit
            </Button>
        </Form>
    );
};

// The type of props MyForm receives
interface MyFormProps {
    initialPhone?: string;
    message: string;
    onSubmit: (data: I_loginData) => void
}

// Wrap our form with the withFormik HoC
const LoginForm = withFormik<MyFormProps, I_loginData>({
    // Transform outer props into form values
    mapPropsToValues: (props:any) => {
        return {
            phone: props.initialPhone || '',
            password: '',
        };
    },
    handleSubmit: async (
        values: I_loginData,
        {props, setSubmitting, setErrors}
    ) => {
        const {onSubmit} = props;
        const isValid = await schema.validate(values);
        if (!isValid) {
            return;
        }
        onSubmit(values);
        console.log(values);
    }
})(InnerForm);

export default LoginForm;