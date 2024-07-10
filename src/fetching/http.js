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
    DELETE: async(url, body) =>{

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return response.json()

    }
}

export const URL = {
    URL_API: 'http://localhost:4040',
}


