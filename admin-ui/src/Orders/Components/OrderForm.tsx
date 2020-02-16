import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import {COUNTRIES} from '../reducer/exports';
import {withFormik, FormikProps, FormikErrors, InjectedFormikProps} from 'formik';
import FormWrapper from "../../Common/FormWrapper";
import {I_orderInternalItem} from "../../../../core/orders-types";
import {CreateField} from "../../Common/CreateField";

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
                    <CreateField
                        label={"First Name"}
                        name={'first_name'}
                        type={"text"}
                        meta={meta}
                    />
                    <CreateField
                        label={"Phone"}
                        name={'phone'}
                        type={"text"}
                        meta={meta}
                    />
                    <CreateField
                        label={"Address"}
                        name={'address'}
                        type={"text"}
                        meta={meta}
                    />
                    <CreateField
                        label={"Checked"}
                        name={'checked'}
                        type={"checkbox"}
                        meta={meta}
                    />
                </Form.Row>
                <Form.Row>
                    <CreateField
                        label={"Delivery date"}
                        name={'delivery_date'}
                        type={"text"}
                        meta={meta}
                    />
                    <FormWrapper name={'delivery_time'} error={errors.delivery_time} label={'Delivery Time'} key={"delivery_time"}>
                        <Form.Control
                            as="select"
                            placeholder="Delivery Time"
                            name="delivery_time"
                            onChange={handleChange}
                            value={values.delivery_time || ''}
                            isInvalid={!!(touched.delivery_time && errors.delivery_time)}>
                            {TIMES.map((t, i) => <option key={t} value={i}>{t}</option>)}
                        </Form.Control>
                    </FormWrapper>
                    <CreateField
                        label={"delivered"}
                        name={'delivered'}
                        type={"date"}
                        meta={meta}
                    />
                    <CreateField
                        label={"Comment"}
                        name={'comment'}
                        type={"text"}
                        meta={meta}
                    />
                    <FormWrapper name={'payment'} error={errors.payment} label={'payment'} key={"payment"}>
                        <Form.Control
                            as="select"
                            placeholder="payment"
                            name="payment"
                            onChange={handleChange}
                            value={values.payment || ''}
                            isInvalid={!!(touched.payment && errors.payment)}>
                            {PAYMENTS.map((p, i) => <option key={p} value={i}>{p}</option>)}
                        </Form.Control>
                    </FormWrapper>
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
