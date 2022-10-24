import axios from 'axios'

export default class HttpClient {
    constructor(url, token) {
        this.axiosInstance = axios.create({
            baseURL: url,
            headers: {
                authorization: token
            }
        })
    }
    async makeRequest({url = '/', method = 'post', params = {}, data = {}, headers = {}}) {
        let resp
        try {
            resp = await this.axiosInstance({
                url,
                method,
                params,
                data,
                headers
            })
        }
        catch (err) {
            resp = err.response
        }
        return [resp.status >= 200 && resp.status < 300, resp.data]
    }
}
