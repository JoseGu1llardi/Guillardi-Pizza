import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;
        console.log(name);

        const createCategoryServive = new CreateCategoryService();

        const category = await createCategoryServive.execute({ name });

        return res.json(category);
 
    }
};

export { CreateCategoryController }