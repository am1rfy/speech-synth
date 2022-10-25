import { defineStore } from 'pinia'
import {stt} from '../services/index.js'

export const useSTTStore = defineStore('stt', {
    state() {
        return {
            text: {
                isExist: false,
                content: '',
                clear: function() {
                    [this.isExist, this.content] = [false, '']
                }
            },
            audio: {
                chunks: [],
                format: 'audio/ogg'
            }
        }
    },
    actions: {
        async convert() {
            const [isSuccess, result] = await stt.convert(this.prepareData())

            if (isSuccess) {
                this.text.isExist = true
                this.text.content = result['result']
            }
            return isSuccess
        },
        prepareData() {
            const blob = new Blob(this.audio.chunks, {
                type: this.audio.format
            })
            const audioFile = new File([blob], 'audio.ogg')

            const formData = new FormData()
            formData.append('ogg', audioFile)

            return formData
        }
    }
})