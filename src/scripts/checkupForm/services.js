import {getCardDataForm} from "./get-card-data-form.js";

export const sendCardDataToServer = async (selector) => {
    const dataToSend = getCardDataForm(selector);
    try {
        const response = await fetch("my-endpoint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
            const data = await response.json();
        } else {
            console.log(dataToSend);
        }

    } catch (error) {
        console.error("Error sending data to server:", error.message);
    }
}