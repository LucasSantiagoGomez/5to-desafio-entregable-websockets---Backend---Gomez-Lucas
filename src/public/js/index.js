const socket = io();

const list = document.getElementById("listproducts")
socket.on("productos",(productos)=>{
    console.log(productos)
    let listProducts = "";
    productos.forEach((prod)=>{
        listProducts +=  `<br>` `producto: ${prod.title}
                                     code ${prod.code} 
                                     descripcion ${prod.description}
                                     precio ${prod.price}</br> `
    })
    list.innerHTML= `${listProducts}`
})