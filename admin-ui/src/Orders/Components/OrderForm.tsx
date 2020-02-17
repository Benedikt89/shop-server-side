import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import {COUNTRIES} from '../reducer/exports';
import {withFormik, FormikProps, FormikErrors, InjectedFormikProps, Field} from 'formik';
import FormWrapper from "../../Common/FormWrapper";
import {I_orderInternalItem} from "../../../../core/orders-types";

const TIMES = ['10-11', "11-12", "12-13", '13-14'];
const PAYMENTS = ['cash', "card", "online"];

const schema = yup.object({
    first_name: yup.string().required('First name is required'),
    phone: yup
        .string()
        .when('country', {
            is: country => ["United States", "Canada"].includes(country),
            then: yup.string().matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone nunber')
        })
        .required(),
    address: yup.string().required('Address is required'),
    delivery_date: yup.string().required('City is required'),
    delivery_time: yup.string().required('Region is required'),
    comment: yup.string().required('Country is required').default('Belarus'),
    payment: yup.string().required('Country is required').default('Afghanistan'),
    checked: yup.boolean().required(),
    delivered: yup.date()
});

interface I_formOutherProps {
    edit: boolean,
    onCancel: () => void,
}

const InnerForm: React.SFC<InjectedFormikProps<I_formOutherProps, I_formValues>> = (props) => {
    const {
        edit,
        onCancel,
        handleSubmit,
        handleChange,
        values,
        touched,
        errors
    } = props;
    let meta = {handleChange, values, touched, errors};

    return (
        <div className="form">
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                    <Field
                        label={"First Name"}
                        name={'first_name'}
                        component={FormWrapper}
                        value={values.first_name || ''}
                    />
                    <Field
                        label={'Phone'}
                        name={'phone'}
                        component={FormWrapper}
                        value={values.phone || ''}
                    />
                    <Field
                        label={"Address"}
                        name={'address'}
                        component={FormWrapper}
                        value={values.address || ''}
                    />
                    <Field
                        label={"Checked"}
                        name={'checked'}
                        type={"checkbox"}
                        component={FormWrapper}
                        value={values.checked || ''}
                    />
                </Form.Row>
                <Form.Row>
                    <Field
                        label={"Delivery date"}
                        name={'delivery_date'}
                        component={FormWrapper}
                        value={values.delivery_date || ''}
                    />
                    <Field
                        name="delivery_time"
                        label={'Delivery Time'}
                        as="select"
                        value={values.delivery_time || ''}
                        component={FormWrapper}
                        {...TIMES.map((t, i) => <option key={t} value={i}>{t}</option>)}
                    />
                    <Field
                        label={"delivered"}
                        name={'delivered'}
                        type={"date"}
                        component={FormWrapper}
                        value={values.delivered || ''}
                    />
                    <Field
                        label={"Comment"}
                        name={'comment'}
                        component={FormWrapper}
                        value={values.comment || ''}
                    />
                    <Field
                        as="select"
                        placeholder="payment"
                        name="payment"
                        label={'payment'}
                        component={FormWrapper}
                        value={values.payment || ''}
                        {...PAYMENTS.map((p, i) => <option key={p} value={i}>{p}</option>)}
                    />
                </Form.Row>
                <Button type="submit" style={{'marginRight': '10px'}}>Save</Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </Form>
        </div>
    );
};

interface I_Props {
    onSave: () => void,
    addOrder: (values: I_orderInternalItem) => void,
    order: I_orderInternalItem,
}

interface I_formValues {
    first_name: string,
    phone: string,
    address: string,
    delivery_time: string,
    delivery_date: string,
    comment: string,
    payment: string,
    checked: string,
    delivered: string,
}

type I_Allprops = I_Props & I_formOutherProps

// Wrap our form with the withFormik HoC
const OrderForm = withFormik<I_Allprops, I_formValues>({
    // Transform outer props into form values
    mapPropsToValues: ({order}: I_Allprops) => {
        const initialValues = {
            first_name: '',
            phone: '',
            address: '',
            delivery_time: '',
            delivery_date: '',
            comment: '',
            payment: '',
            checked: '',
            delivered: '',
        };
        if (order !== undefined) {
            return {
                first_name: order.first_name,
                phone: order.phone,
                address: order.address,
                delivery_time: order.delivery_time,
                delivery_date: order.delivery_date,
                comment: order.comment,
                payment: order.payment,
                checked: order.checked !== null ? order.checked : '',
                delivered: order.delivered !== null ? order.delivered.toDateString() : '',
            }
        } else return initialValues
    },
    handleSubmit: async (
        values: I_formValues,
        {props, setSubmitting, setErrors}
    ) => {
        let {addOrder, onSave, edit} = props;
        const isValid = await schema.validate(values);
        if (!isValid) {
            return;
        }
        if (edit) {
            await addOrder({
                ...props.order,
                ...values,

                delivered: null
            });
        }
        onSave();
        console.log(values);
    }
})(InnerForm);

export default OrderForm;
