import HttpClient from '../http-client.js'
import {textToSpeech} from '../config.js'

const convert = async ({text, format}) => {
    const httpClient = new HttpClient(textToSpeech.URL, textToSpeech.TOKEN)

    return await httpClient.makeRequest({
        url: '/tts/',
        data: {
            text, format
        }
    })
}

export {
    convert
}