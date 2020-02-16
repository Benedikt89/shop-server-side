import {ordersRepository} from "./dal/orders-repository";
import express, {NextFunction, Request, Response} from "express";
const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let orders = await ordersRepository.getOrders();
        return res.status(200).json(orders.map(c => c.toClient()))
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = req.body;
        await ordersRepository.addOrder(order);
        return res.status(201).json({
            message: 'Created Successful'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        await ordersRepository.deleteOrder(orderId);
        return res.status(201).json({
            message: 'Deleted Successful'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.put('/', async (req: Request, res: Response) => {
        try {
            let newOrderInfo = req.body;
            let updated = await ordersRepository.updateOrder(newOrderInfo);
            res.status(201).send(updated)
        } catch (err) {
            res.status(402).send(err)
        }
    });

export default router;