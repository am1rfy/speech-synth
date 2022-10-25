import { defineStore } from 'pinia'
import {stt} from '../services/index.js'

export const useSTTStore = defineStore('stt', {
    state() {
        return {
            text: {
                isExist: false,
                content: ''
            },
            audio: {
                chunks: [],
                format: 'audio/ogg'
            }
        }
    },
    actions: {
        async convert() {
            const blob = new Blob(this.audio.chunks, {
                type: this.audio.format
            })

            // todo
            console.log(blob)

            const [isSuccess, result] = await stt.convert({
                ogg: blob
            })

            if (isSuccess) {
                this.text.isExist = true
                this.text.content = result['result']
            }
            return isSuccess
        },
        clearText() {
            [this.text.isExist, this.text.content] = [false, '']
        }
    }
})