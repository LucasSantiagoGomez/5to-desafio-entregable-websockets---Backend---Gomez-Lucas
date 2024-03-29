import productManager from "../productManager.js"
import { Router } from "express";

const router = Router()

const manager = new productManager();

router.get("/",async(req,res)=>{
    try{
        const consulta = await manager.getProducts();
        let limit = req.query.limit

        if(!consulta){
            return res.status(404).send({
                message: {error:"Producto no encomtrado"},
            })
        }
        if (limit){
            if (isNaN(limit)){
                return res.status(400).send({
                    
                })
            }
            const resultado = consulta.slice(0,limit);
            return res.status(200).send({
                statsu:"succes",
                message:{products: resultado},
            });
        }else{
            return res.status(200).send({
                status:"succes",
                message:{ products: consulta},
            });
        }
    }catch(error){
        console.log(error)
    }
})

router.get("/:pid",async(req,res)=>{
    try{
        let id= req.params.pid

        const consultaId = await manager.getProductById(Number.parseInt(id));
        if(typeof(consultaId)==="string"){
            return res.status(400).send({status:"error",message:consultaId});
        }
        return res.status(200).send({
            status:"succes",
            message:{product: consultaId}
        })
    }catch(error){
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    let newProduct = req.body;
   
    let result = await manager.addProduct(newProduct);
    if (typeof(result)==="string") {
      return res.status(400).send({
        status: "error",
        message: { error: result},
      });
    }
    res.status(201).send({
      status: "success",
      message: {
        success: "producto agregado"
      
      },
    });
  });


router.put("/:pid", async (req, res) => {
    try {
        const product = req.body;
        const id = req.params.pid;
    
        let result = await manager.updateProduct(Number.parseInt(id), product);
        
        if (typeof(result) === "string") {
            return res.status(404).send({
                status: "error",
                message: { error: option },
            });
        }
        return res.status(200).send({
            status: "success",
            message: { update: "producto actualizado" },
        });
    } catch (error) {
        console.log(error);
    }
}) 


router.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        console.log(id) 

    let result = await manager.deleteProducts(id);
    if (typeof(result)=== "string") {
      return res.status(404).send({
                status: "error",
                message: { error: result },
            });
    }

    return res.status(200).send({
         status: "success",
         message: {
         delete: "producto eliminado",
            },
        });

    } catch (error) {
        console.log(error);
    }
});

export default router;