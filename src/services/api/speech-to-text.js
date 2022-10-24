import HttpClient from '../http-client.js'
import {speechToText} from '../config.js'

const convert = ({blob}) => {
    const httpClient = new HttpClient(speechToText.URL, speechToText.TOKEN)

    return httpClient.makeRequest({
        url: '/stt/',
        data: {
            ogg: blob
        }
    })
}

export {
    convert
}