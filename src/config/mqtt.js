import mqtt from 'mqtt'
import { mqttServer } from './consts'

const mqttClient = mqtt.connect('mqtt://200.131.219.102')

export default mqttClient