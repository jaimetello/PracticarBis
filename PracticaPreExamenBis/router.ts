import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import cars from "./componentes/cars.ts"
import journey from "./componentes/journey.ts"
import dropoff from "./componentes/dropoff.ts"
import locate from "./componentes/locate.ts"
const router = new Router();

router.get('/status',(ctx)=>{
    ctx.response.status=200
    ctx.response.body="Ok"    
})

router.put('/cars',cars)
router.post('/journey',journey)
router.post('/dropoff/:id',dropoff)
router.post('/locate/:id',locate)



export { router as default };