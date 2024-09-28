import { convertToJson, renderListWithTemplate } from "./utils.mjs";

function alertTemplate(alert){
    return `<p style="background-color:${alert.background};color:${alert.color}">${alert.message}</p>`
}

export default class Alert{
    constructor(){
        this.checkAlerts()
    }

    async checkAlerts(){
        const alertsPath = "../json/alerts.json";
        const response = await fetch(alertsPath);
        const alerts = await convertToJson(response)
        if(alerts.length > 0){
            this.renderAlerts(alerts)
        }
    }

    renderAlerts(alerts){
        const mainElement = document.querySelector("main");
        const section = document.createElement("section");
        section.classList.add("alert-list");
        section.style.textAlign = "center";
        mainElement.prepend(section);
        renderListWithTemplate(alertTemplate, section, alerts);
    }
}