/**
 * Script para a emulação de sensor de temperatura e humidade
 */
var Thread = Java.type("java.lang.Thread");
var temperature = 25
var humidity = 20

function execute(action) {
    out("Test Script: " + action.getName());
    for (var i = 0; i < 60; i++) {
        updateAmbient()
        out("---------")
        out(60 - i + " seconds remaining")
        out("---------")
        Thread.sleep(2000);
    }
    action.setExitCode(0);
    action.setResultText("done.");
    out("Test Script: Done");
    return action;
}

function updateAmbient() {
    temperature = getRandomIncrease(temperature)
    humidity = getRandomIncrease(humidity)
    out("Temperature: " + temperature);
    out("Humidity: " + humidity);
    mqttManager.publish("iot7-ambient", JSON.stringify({ temperature: temperature, humidity: humidity }));
}

function getRandomIncrease(value, multiplier) {
    multiplier = multiplier || 1
    var increase = Math.random() * multiplier;
    if (Math.random() >= 0.5)
        increase *= -1
    return value + increase
}


function out(message) {
    output.print(message);
}
