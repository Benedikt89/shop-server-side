import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import {COUNTRIES} from '../reducer/exports';
import {I_order, I_formOrder} from "../orders-types";
import {withFormik, FormikProps, FormikErrors, InjectedFormikProps} from 'formik';
import FormWrapper from "../../Common/FormWrapper";

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
    country: yup.string().required('Country is required').default('Afghanistan'),
    postalCode: yup
        .string()
        .when('country', {
            is: 'United States',
            then: yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid postal code'),
        })
        .when('country', {
            is: 'Canada',
            then: yup.string().matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Invalid postal code'),
        })
        .required(),
    phone: yup
        .string()
        .when('country', {
            is: country => ["United States", "Canada"].includes(country),
            then: yup.string().matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone nunber')
        })
        .required(),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number()
        .required('Age is required')
        .min(0, 'Minimum age is 0')
        .max(200, 'Maximum age is 200'),
});

interface I_formOutherProps {
    edit: boolean,
    onCancel: () => void,
}

const InnerForm: React.SFC<InjectedFormikProps<I_formOutherProps, I_formOrder>> = (props) => {
    const {
        edit,
        onCancel,
        handleSubmit,
        handleChange,
        values,
        touched,
        errors
    } = props;
    return (
        <div className="form">
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                    <FormWrapper name={'firstName'} error={errors.firstName} label={'First name'} key={"firstName"}>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={values.firstName || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.firstName && errors.firstName)}
                        />
                    </FormWrapper>
                    <FormWrapper name={'lastName'} error={errors.lastName} label={'Last name'} key={"lastName"}>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={values.lastName || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.firstName && errors.lastName)}
                        />
                    </FormWrapper>
                    <FormWrapper name={'address'} error={errors.address} label={'Last name'} key={"address"}>
                        <Form.Control
                            type="text"
                            placeholder="address"
                            aria-describedby="inputGroupPrepend"
                            name="address"
                            value={values.address || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.address && errors.address)}
                        />
                    </FormWrapper>
                </Form.Row>
                <Form.Row>
                    <FormWrapper name={'city'} error={errors.city} label={'City'} key={"city"}>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={values.city || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.city && errors.city)}
                        />
                    </FormWrapper>
                    <FormWrapper name={'region'} error={errors.region} label={'Region'} key={"region"}>
                        <Form.Control
                            type="text"
                            placeholder="Region"
                            name="region"
                            value={values.region || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.region && errors.region)}
                        />
                    </FormWrapper>
                    <FormWrapper name={'country'} error={errors.country} label={'Country'} key={"country"}>
                        <Form.Control
                            as="select"
                            placeholder="Country"
                            name="country"
                            onChange={handleChange}
                            value={values.country || ''}
                            isInvalid={!!(touched.region && errors.country)}>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </Form.Control>
                    </FormWrapper>
                    <FormWrapper name={'postalCode'} error={errors.postalCode} label={'Postal Code'} key={"postalCode"}>
                        <Form.Control
                            type="text"
                            placeholder="Postal Code"
                            name="postalCode"
                            value={values.postalCode || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.postalCode && errors.postalCode)}
                        />
                    </FormWrapper>
                    <FormWrapper name={'phone'} error={errors.phone} label={'phone'} key={"phone"}>
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={values.phone || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.phone && errors.phone)}
                        />
                    </FormWrapper>
                    <FormWrapper name={'email'} error={errors.email} label={'email'} key={"email"}>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values.email || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.email && errors.email)}
                        />
                    </FormWrapper>
                    <FormWrapper name={'age'} error={errors.age} label={'age'} key={"age"}>
                        <Form.Control
                            type="text"
                            placeholder="Age"
                            name="age"
                            value={`${values.age}` || ''}
                            onChange={handleChange}
                            isInvalid={!!(touched.age && errors.age)}
                        />
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
    addOrder: (values: I_formOrder) => void,
    order?: I_order,
}

type I_Allprops = I_Props & I_formOutherProps

// Wrap our form with the withFormik HoC
const OrderForm = withFormik<I_Allprops, I_formOrder>({
    // Transform outer props into form values
    mapPropsToValues: ({order}: I_Allprops) => {
        const initialValues = {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            region: '',
            country: '',
            postalCode: '',
            phone: '',
            email: '',
            age: +''
        };
        if (order !== undefined) {
            return {
                firstName: order.firstName,
                lastName: order.lastName,
                address: order.address,
                city: order.city,
                region: order.region,
                country: order.country,
                postalCode: order.postalCode,
                phone: order.phone,
                email: order.email,
                age: order.age
            }
        } else return initialValues
    },
    handleSubmit: async (
        values: I_formOrder,
        {props, setSubmitting, setErrors}
    ) => {
        let {addOrder, onSave, edit} = props;
        const isValid = await schema.validate(values);
        if (!isValid) {
            return;
        }
        if (!edit) {
            await addOrder(values);
        } else {
            await addOrder({...values});
        }
        onSave();
        console.log(values);
    }
})(InnerForm);

export default OrderForm;
