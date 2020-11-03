import { Database } from "https://deno.land/x/mongo@v0.12.1/ts/database.ts";

import {IContext, coches} from "../interfaces.ts"
const cars=async(ctx:IContext)=>{
    try{
        const db: Database = ctx.state.db; 
        const cars = db.collection<any>("Coches")
        const personas = db.collection<any>("Personas")
        await cars.deleteMany({})
        await personas.deleteMany({})
        let a:coches[] = await ctx.request.body().value
        
        
        let c:boolean=true
        a = a.filter((elem:coches)=>{
            if(elem.seats<4|| elem.seats>6){ 
                c=false
            }else{
                return elem
             }
        })
       
        a=a.map((elem)=>{
            return{
                ...elem,
                status:false
            }
        })

        await cars.insertMany(a)
        if(c){
          ctx.response.body="OK"
          ctx.response.status=200  
        }else{
          ctx.response.body="Fallo en plazas"
          ctx.response.status=400
        }
        
        

    }catch(e){
        ctx.response.body="Error inesperado"
        ctx.response.status=500
    }
}
export {cars as default}