import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventioriesSchema } from "@/lib/validators/inventoriesSchema";
import { eq } from "drizzle-orm";

export async function GET(req:Request) {

    try {
        const inventori = await db.select({
            id:inventories.id,
            sku:inventories.sku,
            warehouse:warehouses.name,
            product:products.name
        }).from(inventories).leftJoin(warehouses,eq(warehouses.id,inventories.id)).leftJoin(products,eq(products.id,inventories.productId))
        return Response.json(inventori)
    } catch (error) {
        
    }
    // return Response.json({"message":"hello world"})
}

export async function POST(req:Request) {
    const data = await req.json();
    let validatedData;

    try {
        validatedData = inventioriesSchema.parse({
            sku:data.sku,
            warehouseId:Number(data.warehouseId),
            productId:Number(data.productId)
        })
    } catch (error) {
        return Response.json({message:"undefiend validate data"},{status:400})
    }

    try {
        await db.insert(inventories).values(validatedData)
    } catch (error) {
        return Response.json({message:"failed to store to inventories data"},{status:500})
    }

    return Response.json({message:"OK"},{status:201})
}