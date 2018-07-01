/**
 * Script para a emulação de sensor de temperatura e humidade
 */
var Thread = Java.type("java.lang.Thread");
var temperature = 30
var humidity = 30

function execute(action) {
    out("Test Script: " + action.getName());
    for (var i = 0; i < 60; i++) {
        updateTemperature();
        updateHumidity();
        out("---------")
        out(60 - i + " seconds remaining")
        out("---------")
        Thread.sleep(1000);
    }
    action.setExitCode(0);
    action.setResultText("done.");
    out("Test Script: Done");
    return action;
}

function updateTemperature() {
    temperature = getRandomIncrease(temperature)
    out("Temperature: " + temperature);
    mqttManager.publish("iot7-temperature", temperature);
}

function updateHumidity() {
    humidity = getRandomIncrease(humidity)
    out("Humidity: " + humidity);
    mqttManager.publish("iot7-humidity", humidity);
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
