export const sendCardDataToServer = async (data) => {
    try {
        const response = await fetch("my-endpoint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
        } else {
            console.log(data);
        }

    } catch (error) {
        console.error("Error sending data to server:", error.message);
    }
}