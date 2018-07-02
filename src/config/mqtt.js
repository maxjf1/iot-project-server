import mqtt from 'mqtt'
import { mqttServer, mqttAmbientTopic } from './consts'
import { registerAmbientEntry } from '../controllers/Sensors'

const entryRegisters = {
    [mqttAmbientTopic]: registerAmbientEntry
}

console.log('conectando ao Servidor MQTT...')
const mqttClient = mqtt.connect(mqttServer)

mqttClient.on('connect', function () {
    console.log('Servidor MQTT conectado!')
    mqttClient.subscribe(mqttAmbientTopic)
})

mqttClient.on('message', function (topic, message) {
    if (entryRegisters[topic])
        entryRegisters[topic](message.toString())
})

mqttClient.on('error', err => console.error('Erro MQTT: ', err))
mqttClient.on('offline', err => console.warn('Cliente MQTT offline.'))
mqttClient.on('close', err => console.warn('Cliente MQTT desconectado.'))

export default mqttClient