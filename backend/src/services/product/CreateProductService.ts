import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, category_id }: ProductRequest) {

        // check if name already registered on the platform
        const nameAlreadyRegistered = await prismaClient.product.findFirst({
            where: {
                name: name
            }
        });

        if (nameAlreadyRegistered) {
            throw new Error('Pizza already registered!');
        } else {
            const product = await prismaClient.product.create({
                data: {
                    name,
                    price,
                    description,
                    banner,
                    category_id
                },
                select: {
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    category_id: true
                }
            });

            return product;

        }

    }
};

export { CreateProductService };