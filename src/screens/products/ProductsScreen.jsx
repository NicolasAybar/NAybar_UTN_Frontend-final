import React, { useState, useEffect } from 'react';
import { product, productListado, productUpdate, productDesabilitar } from '../../fetching/product.fetching.js';
import './Products.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'

const ProductsScreen = () => {
  const [productList, setProductList] = useState([]);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const [editarProductos, setEditarProductos] = useState(false);

  const [descripcion, setDescripcion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const [id, setId] = useState('');

  const handleSubmit = async (event) => {
    try {

      event.preventDefault()
      const producto = {
        /*    email: event.target.email.value,  */
        titulo: event.target.titulo.value,
        codigo: event.target.codigo.value,
        descripcion: event.target.descripcion.value,
        precio: event.target.precio.value,
        stock: event.target.stock.value,
      }
      await product(producto)
      setErrorText('')
      navigate('/products')
      LimpiarControles()
      ListarProductos()
      Swal.fire({
        icon: 'success',
        title: `The product ${producto.titulo} has been inserted`,
        showConfirmButton: true,
        timer: 5000
      })
    }
    catch (error) {
      setErrorText(error.message)
      Swal.fire({
        icon: 'error',
        title: 'Error en servidor',
        text: error.message
      })
    }
  }
  const LimpiarControles = () => {
    /*document.getElementById('descripcion').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';*/
    setDescripcion('');
    setTitulo('');
    setCodigo('');
    setPrecio('');
    setStock('');
    setId('');

    setEditarProductos(false)
  }
  const editarProducto = (val) => {
    setEditarProductos(true)
    setId(val.id)
    setDescripcion(val.descripcion)
    setTitulo(val.titulo)
    setCodigo(val.codigo)
    setPrecio(val.precio)
    setStock(val.stock)
  }


  const actualizarProductos = async (event) => {
    try {
      event.preventDefault()
      const prodUp = {
        titulo:titulo,
        descripcion:descripcion,
        stock:stock,
        precio:precio,
        codigo:codigo    
      }
      
      console.log(prodUp,id,titulo)
      await productUpdate(id,prodUp)
      
      setErrorText('')
      navigate('/products')
      LimpiarControles()
      ListarProductos()
      Swal.fire({
        icon: 'success',
        title: `The Product  ${prodUp.titulo} has been updated`,
        showConfirmButton: true,
        timer: 5000
      })
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product Not Updated!',
        footer: JSON.parse(JSON.stringify(error)).message==='Network Error'?'Could not connect to the server':'Check the console'
    })
      console.log(error)
      console.error('Error updating product',error)
      setErrorText(error.message)
    }

  }
  
   const DeshabilitarProducto = async (val) => {
   
    Swal.fire({
        title: 'Confirm deletion?',
        html: '<i>Do you really want to  <strong> delete </strong>?</i>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            let idDeshabilitar = val;          
            try {
                await productDesabilitar(idDeshabilitar);
                ListarProductos();
                
                Swal.fire({
                    icon: 'success',
                    title: 'The registry ' + val + ' has been deleted',
                    showConfirmButton: false,
                    timer: 5000
                });
            } catch (error) {
              console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to delete the product!',
                    footer: JSON.parse(JSON.stringify(error)).message === 'Network Error' ? 'Could not connect to the server' : 'Check the console'
                    
                  });
            }
        }
    });
}

  const ListarProductos = async () => {
    try {
      const result = await productListado();
      
      return setProductList(result);

    } catch (error) {
      console.log(error);
      console.error(error);
    }
  }
  useEffect(() => {
    ListarProductos();
  }, []);

  /*     */
  return (
    <div className='contenedor'>
      <form onSubmit={handleSubmit} className='products'>
        <h1 className='title'>Product CRUD UTN</h1>
        <div className='input-field'>
          {/*<i className='fa fa-bandcamp'></i>*/}
          <input onChange={(e) => setDescripcion(e.target.value)} placeholder='' id='descripcion' name='descripcion' value={descripcion} required />
          <label htmlFor='descripcion'>Description</label>
        </div>

        <div className='input-field'>
          {/*<i className='fa-solid fa-title'></i>*/}
          <input onChange={(e) => setTitulo(e.target.value)} placeholder='' id='titulo' name='titulo' value={titulo} required />
          <label htmlFor='titulo'>Tittle</label>
        </div>

        {/*<div className='input-group mb-3'>*/}
        <div className='input-field'>
          {/*<i className='fa-solid fa-cod'></i>*/}
          <input onChange={(e) => setCodigo(e.target.value)} placeholder='' id='codigo' name='codigo' value={codigo} required />
          <label htmlFor='codigo'>Códe</label>
        </div>

        <div className='input-field'>
          {/*<i className='fa-solid fa-stock'></i>*/}
          <input type='number' onChange={(e) => setStock(e.target.value)} placeholder='' id='stock' name='stock' value={stock} required />
          <label htmlFor='stock'>Stock</label>
        </div>

        <div className='input-field'>
          {/*<i className='fa-solid fa-price'></i>*/}
          <input type='number' onChange={(e) => setPrecio(e.target.value)} placeholder='' id='precio' name='precio' value={precio} step="0.01" required />
          <label htmlFor='precio'>Price</label>
        </div>
        {
          errorText
          &&
          <span style={{ color: 'red' }}>{errorText}</span>
          
        }
        
        <div className='card-footer text-muted'>
          {
            editarProductos?
              <div>
                <button className='btn btn-warning m-2' onClick={actualizarProductos}>Update</button>
                <button className='btn btn-danger m-2' onClick={LimpiarControles}>Cancel</button>
              </div>
              :<button type='submit' className='btn btn-primary'>Insert</button>
          }
        </div>

      </form>
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>Nro#</th>

            <th scope='col'>Title</th>
            <th scope='col'>Code</th>
            <th scope='col'>Descrpition</th>
            <th scope='col'>price</th>
            <th scope='col'>Stock</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody >
          {
            productList.map((val, key) => {
              return <tr key={val.id}>
                <th scope='row'>{val.id}</th>

                <td>{val.titulo}</td>
                <td>{val.codigo}</td>
                <td>{val.descripcion}</td>
                <td>{val.precio}</td>
                <td>{val.stock}</td>
                <td>
                  <div className='btn-group' role='group' aria-label='Basic example'>
                    <button type='button'
                      onClick={() => { editarProducto(val) }}
                      className='btn btn-info'>Edit</button>
                    <button type='button' onClick={() => {
                      DeshabilitarProducto(val.id);
                    }} className='btn btn-danger'>Delete</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
        
      </table>
    </div>
  )
}
export default ProductsScreen
