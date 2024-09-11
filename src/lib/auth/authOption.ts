import GoogleProvider from "next-auth/providers/google"
import { db } from "../db/db"
import { User } from "../db/schema"
import { AuthOptions } from "next-auth"
export const authOption:AuthOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile,token:any){
                const data = {
                    fname:profile.given_name,
                    lname:profile.family_name,
                    email:profile.email,
                    provider:"GOOGLE",
                    externalId:profile.sub,
                    image:profile.picture,
                }

                try {
                    const user = await db.insert(User).values(data).onConflictDoUpdate({target:User.email,set:data}).returning()
                    return{
                        ...data,
                        name:data.fname,
                        id:String(user[0].id),
                        role:user[0].role
                    }
                } catch (error) {
                   return {
                    id:" "
                   } 
                }
    },},),
    ],
    callbacks:{
        session(data:any){
            return data
        },
        jwt({token,user}:{token:any,user:any}){
            if(user){
                token.role = user.role,
                token.id = user.id
            }
            return token;
        }
    }
}