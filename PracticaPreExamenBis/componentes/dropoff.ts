import { Database } from "https://deno.land/x/mongo@v0.12.1/ts/database.ts";
import { Context, helpers } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { IContext } from "../interfaces.ts";


const dropoff =async(ctx:IContext)=>{

    try{
        
        const db: Database = ctx.state.db;       
        const { id2 } = helpers.getQuery(ctx, { mergeParams: true });  
          
        const personas = db.collection<any>("Personas")      
        const coches = db.collection<any>("Coches")
               
        const persona = await personas.findOne({id:Number(id2)})
       if(persona){
            await coches.updateOne(
            {id:persona.idCoche},
            {$set:{status:false}}
            
        )
        await personas.deleteOne({id:Number(id2)})
         ctx.response.body="OK"
       }else{
           ctx.response.body="No hay persona"
           ctx.response.status=400
       }
       

    }catch(e){

    }
}

export {dropoff as default}