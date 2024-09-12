import {z} from "zod";


const isServer = typeof window === 'undefined'

export const productSchema = z.object({
    name:z.string({message:"product name should be text"}).max(100,{message:"name should be less then 100"}),
    image:z.instanceof(isServer?File:FileList,{message:"product image should be image"}),
    description:z.string({message:"product description should be text"}),
    price:z.number({message:"prodcut price should be number"}),
})