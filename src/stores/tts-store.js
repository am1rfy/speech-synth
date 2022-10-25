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
            const [isSuccess, result] = await tts.convert({
                text: this.formData.text,
                format: this.formData.format
            })

            // TODO
            if (isSuccess) {
                this.audio.isExist = true
                this.audio.src = import.meta.env.VITE_TTS_URL.concat(result['result_url'])
            }
            return isSuccess
        }
    }
})