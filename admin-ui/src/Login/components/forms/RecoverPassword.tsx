import React from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Field, Formik } from 'formik';
import FormWrapper from "../../../Common/FormWrapper";

interface I_recoverPass {
    password: string
}

const schema = yup.object({
    password: yup.string().required('Password name is required'),
});

interface OtherProps {
    message: string;
}

const ReacoverForm:React.FC = ({initialPhone, message, onSubmit}: any) => {

    const asd = async (evt: any) => {
        const isValid = await schema.validate(evt);
        if (!isValid) {
            return;
        }
        onSubmit()
    };

    return (
        <Formik
            initialValues={{
                password: '',
            }}
            validationSchema={schema}
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

export default ReacoverForm;