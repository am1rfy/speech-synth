import HttpClient from '../http-client.js'
import {speechToText} from '../config.js'

const convert = async ({ogg}) => {
    const httpClient = new HttpClient(speechToText.URL, speechToText.TOKEN)

    return await httpClient.makeRequest({
        url: '/stt/',
        data: {
            ogg
        }
    })
}

export {
    convert
}