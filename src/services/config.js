const textToSpeech = {
    URL: import.meta.env.VITE_TTS_URL,
    TOKEN: 'Token '.concat(import.meta.env.VITE_TTS_TOKEN)
}

const speechToText = {
    URL: import.meta.env.VITE_STT_URL,
    TOKEN: 'Token '.concat(import.meta.env.VITE_TTS_TOKEN)
}

export {
    textToSpeech,
    speechToText
}