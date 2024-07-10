/* fetch es una peticion http  */  
//import { HTTP, URL } from "./httpProduct.js"
import { HTTP, URL } from "./http.js"
/* /api/products  */
const ROUTE = '/api/product'


export const product = async (producto) => {
  
    try{
      /* el endpoint es insertarProductos, /api/product/insertarProductos  */
    const result = await HTTP.POST (URL.URL_API + ROUTE + '/insertarProductos', producto)
    
    if(!result.ok){
        throw result
    } 
  }
  catch(error){
    throw{message:error.message}
  }
}
export const productListar = async (producto) => {
  
  try{
  const result = await HTTP.GET (URL.URL_API + ROUTE + '/ListarProductos', {})
  console.log(result)
  if(!result.ok){
      throw result
  } 
  }
  catch(error){
    throw{message:error.message}
  }
}
export const verificarToken = async () =>{
  try{
      const token  = localStorage.getItem('token')
      const headers = new Headers()
      headers.append('authorization', token)
      const result = await HTTP.GET(URL.URL_API + ROUTE + '/verify-token', headers)
      return result
  }
  catch(error){
      console.log(error + 'fectchin con error')
  }
}
export const productListado = async (producto) => {
  
  try{
  const result = await HTTP.GET (URL.URL_API + ROUTE + '/ListarProductos', producto)
  
  if(result.status !== 200){
      throw result
  } 
  return result.productos
}
catch(error){
  throw{message:error.message}
}
}
export const productUpdate = async(id,producto) =>{

  try{
    const result = await HTTP.PUT(URL.URL_API + ROUTE + '/updateProduct/' + id,producto) 
    if(result.status !== 200){
       throw result
    } 
    return result
  }
  catch(error){ 
    console.log(error)
    throw{message:error.message}    
  }
}
export const productDesabilitar = async (pid) => {
  console.log('fetch el id es: ',pid)
  try {
    const result = await HTTP.PUT(URL.URL_API + ROUTE + '/desabilitarProducto/' + pid, {})
    if(result.status !== 200){
      throw result
   } 
   else{
    return result
   }
   
  } catch (error) {
    throw{message:error.message} 
  }
}