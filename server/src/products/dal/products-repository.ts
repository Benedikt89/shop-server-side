import {I_productsResponse, I_productItem, I_productToCreate} from "../../../../core/products-types";
import Product, {IMongoose_Product} from "./Product"
import {ENV_URL} from "../../config";


export const productsRepository = {

    async getProducts(search?: string): Promise<I_productsResponse> {
        let result = await Product.find();
        if (search) {
            result = await Product.find({_id: new RegExp(search)});
        }
        return new Promise((resolve, reject) => {
            resolve(
                {
                    count: +result.length,
                    products: result.map((doc: IMongoose_Product) => {
                        return {
                            id: doc.id,
                            name: doc.name,
                            price: +doc.price,
                            photo: `${ENV_URL + doc.photo}`,
                            size: +doc.size,
                            text_long: doc.text_long,
                            text_short: doc.text_short,
                        }
                    })
                }
            )
        })
    },

    async getProduct(search: string): Promise<I_productItem> {

        let doc = await Product.find({_id: search});

        return new Promise((resolve, reject) => {
            resolve(
                {
                    id: doc[0].id,
                    name: doc[0].name,
                    price: +doc[0].price,
                    photo: doc[0].photo,
                    size: +doc[0].size,
                    text_long: doc[0].text_long,
                    text_short: doc[0].text_short
                }
            )
        })
    },

    async addProduct(product: I_productToCreate): Promise<I_productItem> {
        const newProduct = new Product({
            name: product.name,
            photo: product.photo,
            price: product.price,
            size: product.size,
            text_long: product.text_long,
            text_short: product.text_short
        });
        let doc = await newProduct.save();
        return new Promise(((resolve, reject) => resolve
        ({
            id: doc.id,
            name: doc.name,
            price: +doc.price,
            photo: `${ENV_URL + doc.photo}`,
            size: +doc.size,
            text_long: doc.text_long,
            text_short: doc.text_short,
        })))
    },

    async updateProduct(newProduct: I_productItem): Promise<I_productItem> {
        return await Product.update({_id: newProduct.id}, newProduct)
    },

    async deleteProduct(poroductId: string): Promise<any> {
        return Product.deleteOne({_id: poroductId});
    },
};
