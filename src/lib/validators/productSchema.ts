import {z} from "zod";

export const productSchema = z.object({
    name:z.string({message:"product name should be text"}).max(100,{message:"name should be less then 100"}),
    image:z.instanceof(File,{message:"product image should be image"}),
    description:z.string({message:"product description should be text"}),
    price:z.number({message:"prodcut price should be number"}),
})