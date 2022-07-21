const ip = '25.84.228.15'
const port = '8080'

export class serverRequest {
    static getAllQueuesById(id) {
        return this.#promisRequest(sendRequest(`listOfQueues/get/${id}`, 1))
    }
    static updateDataBase(id, name, domen) {
        return this.#promisRequest(sendRequest(`student/add/${id}/${name.replace(' ', '_')}/${domen}`, 0))
    }
    static getAllStudents() {
        return this.#promisRequest(sendRequest(`student/all`, 1))
    }
    static getAllQueues() {
        return this.#promisRequest(sendRequest(`queue/all`, 1))
    }
    static async request(url_to, type) {
        return await sendRequestAsync(url_to, type)
    }
    #promisRequest() {

    }
}

export async function sendRequestAsync(url_to, type) {
    const url = `http://${ip}:${port}/${url_to}`
    try {
        const response = await fetch(url, {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await type ? response.json() : response.text()
    }
    catch (err) {
        return 'error'
    }
}