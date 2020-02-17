import React from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {FormikProps, Formik, Field} from 'formik';
import FormWrapper from "../../../Common/FormWrapper";
import {I_loginData} from "../../auth-types";

const SignupSchema = yup.object({
    phone: yup.string()
        .min(4, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Phone is required'),
    password: yup.string()
        .min(4, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Password is required'),
});

interface OtherProps {
    message: string;
}

interface MyFormProps {
    initialPhone?: string;
    message: string;
    onSubmit: (data: I_loginData) => void
}

const LoginForm:React.FC = ({initialPhone, message, onSubmit}: any) => {

    const asd = async (evt: any) => {
        const isValid = await SignupSchema.validate(evt);
        if (!isValid) {
            return;
        }
        onSubmit()
    };

    return (
        <Formik
            initialValues={{
                phone: '',
                password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={asd}
        >
            {({
                  handleSubmit,
                  values,
                  isSubmitting
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <h1>{'message'}</h1>
                    <Field
                        label={'phone'}
                        name={'phone'}
                        component={FormWrapper}
                        value={values.phone || ''}
                    />
                    <Field
                        label={'password'}
                        name={'password'}
                        component={FormWrapper}
                        value={values.password || ''}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;