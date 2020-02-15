import React from "react";
import {I_order} from "../orders-types";
import Button from "react-bootstrap/Button";

interface I_props {
    order: I_order,
    openMap: (order: I_order) => void,
    editOrder: (order: I_order) => void,
    deleteSelectedOrder: (id: string) => void,
}
const OrderRaw: React.FC<I_props> = ({order, openMap, editOrder, deleteSelectedOrder}) => {

    return (
        <tr key={order.id}>
            <td>{order.firstName}</td>
            <td>{order.lastName}</td>
            <td>{order.address}</td>
            <td>{order.city}</td>
            <td>{order.country}</td>
            <td>{order.postalCode}</td>
            <td>{order.phone}</td>
            <td>{order.email}</td>
            <td>{order.age}</td>
            <td>
                <Button
                    variant="outline-primary"
                    onClick={ () => {openMap(order)} }
                >
                    Map
                </Button>
            </td>
            <td>
                <Button
                    variant="outline-primary"
                    onClick={ () => {editOrder(order)} }
                >
                    Edit
                </Button>
            </td>
            <td>
                <Button
                    variant="outline-primary"
                    onClick={ () => {deleteSelectedOrder(order.id)} }
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
};

export default OrderRaw;