import { db } from "@/lib/db/db";
import { deliveryPerson, warehouses } from "@/lib/db/schema";
import { deliveryPersonss } from "@/lib/validators/deliveryPersonss";
import { desc, eq } from "drizzle-orm";

export async function GET(req:Request) {
    try {
        const deliveryP = await db.select({
            id:deliveryPerson.id,
            name:deliveryPerson.name,
            phone:deliveryPerson.phone,
            warehouse:warehouses.name
        }).from(deliveryPerson).leftJoin(warehouses,eq(deliveryPerson.id,warehouses.id)).orderBy(desc(deliveryPerson.id))
        return Response.json(deliveryP,{status:200}) 
    } catch (error) {
        return Response.json({"message":error.message})
    }
}

export async function POST(req:Request) {
    const data = await req.json();
    
    let validatedData;
    try {
        validatedData = deliveryPersonss.parse({
            name:data.name,
            phone:data.phone,
            warehouseId:data.warehouseId
        })
    } catch (error) {
        return Response.json({message:error.message},{status:400})
    }

    try {
        await db.insert(deliveryPerson).values(validatedData)
    } catch (error) {
        return Response.json({message:error.message},{status:500})
    }
    return Response.json({message:"OK"},{status:201})
}