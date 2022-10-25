import HttpClient from '../http-client.js'
import {textToSpeech} from '../config.js'

const convert = async (formData) => {
    const httpClient = new HttpClient(textToSpeech.URL, textToSpeech.TOKEN)

    return await httpClient.makeRequest({
        url: '/tts/',
        data: formData
    })
}

export {
    convert
}