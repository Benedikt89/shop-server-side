import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OrderForm from "./OrderForm";
import "../../App.css";
import MapComponent from "./MapComponent";
import {connect} from "react-redux";
import { getLatLng } from "../reducer/requests";
import { deleteOrder, getOrders, addOrder, editOrder } from "../reducer/actions";
import {AppStateType} from "../../redux/store";
import OrderRaw from "./OrderRaw";
import {I_orderCommon, I_orderInternalItem} from "../../../../core/orders-types";

interface I_connectedProps {
    orders: Array<I_orderInternalItem> | []
}
interface I_dispatchedProps {
    deleteOrder: (id: string) => void,
    getOrders: () => void,
    addOrder: (order: I_orderCommon) => void,
    editOrder: (order: I_orderInternalItem) => void
}
interface I_OrdersProps extends I_connectedProps, I_dispatchedProps {}

const OrdersPage:React.FC<I_OrdersProps> = ({orders, getOrders, deleteOrder, addOrder, editOrder}) => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openMapModal, setOpenMapModal] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [loc, setLoc] = useState({
        lat: 0,
        lng: 0,
    });
    const [selectedOrder, setSelectedOrder] = useState();

    const openModal = () => {
        setOpenAddModal(true);
    };
    const closeModal = () => {
        setOpenAddModal(false);
        setOpenEditModal(false);
        setOpenMapModal(false);
        getData();
    };
    const cancelAddModal = () => {
        setOpenAddModal(false);
    };
    const editModeOrder = (order: I_orderInternalItem) => {
        setSelectedOrder(order);
        setOpenEditModal(true);
    };
    const cancelEditModal = () => {
        setOpenEditModal(false);
    };
    const getData = () => {
        getOrders();
        setInitialized(true);
    };
    const deleteSelectedOrder = (id: string) => {
        deleteOrder(id);
    };

    const openMap = async (order: I_orderInternalItem) => {
        try {
            const address = `${order.address}`;
            const response = await getLatLng(address);
            const loc = response.data.results[0].geometry.location;
            setLoc(loc);
            setOpenMapModal(true);
        } catch (ex) {
            console.log(ex);
        }
    };
    let getRandom = () => Math.floor(Math.random() * 105);
    let randomData:I_orderCommon = {
        phone: `${getRandom()}`,
        first_name: `string${getRandom()}`,
        delivery_time: `string${getRandom()}`,
        delivery_date: `Minsk`,
        address: `Belarus, Minsk`,
        comment: `Minsk`,
        payment: `0`,
        order_items: [{ pizza: 'string', quantity: 2}]
    };
    const addRandom = () => {
        addOrder(randomData);
    };

    useEffect(() => {
        if (!initialized) {
            getData();
        }
    });

    // @ts-ignore
    let dispayedOrders = orders.length ? orders.map( (c: I_order) => <OrderRaw
        key={c.id + 'cont'}
        order={c}
        openMap={openMap}
        editOrder={editModeOrder}
        deleteSelectedOrder={deleteSelectedOrder}
    />) : <h2>NoOrders</h2>;

    return (
        <div className="home-page">
            <h1>Orders</h1>
            <Modal show={openAddModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderForm
                        edit={false}
                        onSave={closeModal}
                        onCancel={cancelAddModal}
                        addOrder={(c) => {addOrder(c)}}
                        order={orders[0]}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={openEditModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderForm
                        edit={true}
                        onSave={closeModal}
                        order={selectedOrder}
                        addOrder={(c) => {editOrder({...c, id: selectedOrder.id})}}
                        onCancel={cancelEditModal}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={openMapModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MapComponent
                        lat={loc.lat}
                        lng={loc.lng}
                    />
                </Modal.Body>
            </Modal>
            <ButtonToolbar onClick={openModal}>
                <Button variant="outline-primary">Add Order</Button>
            </ButtonToolbar>
            <br />
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Postal Code</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Map</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {dispayedOrders}
                </tbody>
            </Table>
            <Button onClick={addRandom}>addRandom</Button>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        orders: state.orders.orders
    };
};


let ComposedComponent = connect(
    mapStateToProps,
    { getOrders, deleteOrder, addOrder, editOrder }
)(OrdersPage);

export default ComposedComponent;