import { Request, Response } from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';

class RemoveOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string;

        const removeOrder = new RemoveOrderService();

        const deleteOrder = await removeOrder.execute({
            order_id
        });

        res.json(deleteOrder);

    }
}

export { RemoveOrderController }