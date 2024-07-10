export const HTTP = {
    GET: async (url, headers) =>{
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
  
        })
        return response.json()
    },
    POST: async (url, body) =>{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return response.json()
    },
    PUT: async (url, body) =>{
       
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
       
        return response.json()
    },
    /*PUT: async (url, body) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                throw new Error('Error al procesar la solicitud.');
            }
    
            return response.json();
        } catch (error) {
            console.error('Hubo un error en la petición PUT:', error);
            // Puedes decidir qué hacer en caso de error, por ejemplo lanzar una excepción o devolver un objeto con un mensaje de error
            return { error: 'Ocurrió un error al hacer la petición PUT' };
        }
    },*/
    DELETE:() =>{

    }
}

export const URL = {
    URL_API: 'http://localhost:4040',
    /* puedo poner mas URL */
}


