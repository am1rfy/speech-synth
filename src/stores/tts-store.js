import { defineStore } from 'pinia'
import {tts} from '../services/index.js'

export const useTTSStore = defineStore('tts', {
    state() {
        return {
            audio: {
                isExist: false,
                src: '',
                clear: function() {
                    [this.isExist, this.src] = [false, '']
                }
            },
            formData: {
                text: '',
                format: 'ogg'
            }
        }
    },
    actions: {
        async convert() {
            const formData = {
                text: this.formData.text,
                format: this.formData.format
            }
            const [isSuccess, result] = await tts.convert(formData)

            // TODO
            if (isSuccess) {
                this.audio.isExist = true
                this.audio.src = import.meta.env.VITE_TTS_URL.concat(result['result_url'])
            }
            return isSuccess
        }
    }
})