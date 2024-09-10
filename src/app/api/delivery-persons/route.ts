import { db } from "@/lib/db/db";
import { deliveryPerson } from "@/lib/db/schema";
import { deliveryPersonss } from "@/lib/validators/deliveryPersonss";

export async function GET(req:Request) {
    return Response.json({"message":"OK"},{status:200}) 
}

export async function POST(req:Request) {
    const data = await req.json();
    
    let validatedData;
    try {
        validatedData = deliveryPersonss.parse({
            name:data.name,
            phone:data.phone,
            warehouse_id:data.warehouse_id
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