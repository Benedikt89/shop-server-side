import React from "react";
import Button from "react-bootstrap/Button";
import {I_orderInternalItem} from "../../../../core/orders-types";

interface I_props {
    order: I_orderInternalItem,
    openMap: (order: I_orderInternalItem) => void,
    editOrder: (order: I_orderInternalItem) => void,
    deleteSelectedOrder: (id: string) => void,
}
const OrderRaw: React.FC<I_props> = ({order, openMap, editOrder, deleteSelectedOrder}) => {

    return (
        <tr key={order.id}>
            <td>{order.first_name}</td>
            <td>{order.phone}</td>
            <td>{order.address}</td>
            <td>{order.delivery_date}</td>
            <td>{order.delivery_time}</td>
            <td>{order.createdAt}</td>
            <td>{order.checked}</td>
            <td>{order.delivered}</td>
            <td>{order.payment}</td>
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
                    variant="outline-danger"
                    size='sm'
                    onClick={ () => {deleteSelectedOrder(order.id)} }
                >
                    X
                </Button>
            </td>
        </tr>
    )
};

export default OrderRaw;