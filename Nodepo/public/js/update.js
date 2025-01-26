const form = document.getElementById("dataForm");
const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
        userid: document.getElementById("userid").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        emailaddress: document.getElementById("emailaddress").value,
        mobilenumber: document.getElementById("age").value,
        age: parseInt(document.getElementById("age").value),
    };

    try {
        const response = await fetch("http://localhost:3001/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.textContent = result.message;
            responseMessage.textContent = result.message;
        } else {
            responseMessage.textContent = result.message || "An error occured";
            responseMessage.style.color = "red";
        }
    } catch (err) {
        console.error(`Error: ${err}`);
        responseMessage.textContent = "Failed to submit data."
        responseMessage.style.color = "red";
    }

});

