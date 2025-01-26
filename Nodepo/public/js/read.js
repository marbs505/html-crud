async function getAllUsers() {
    try {
        const response = await fetch("http://localhost:3001");

        if (!response.ok) {
            throw new Error("Error fetching users");
        }
        
        const users = await response.json();

        const tbody = document.getElementById("users-table").getElementsByTagName("tbody")[0];

        tbody.innerHTML = "";

        users.forEach(user => {
            const row = tbody.insertRow();

            row.insertCell(0).textContent = user.userid;
            row.insertCell(1).textContent = user.firstname;
            row.insertCell(2).textContent = user.lastname;
            row.insertCell(3).textContent = user.emailaddress;
            row.insertCell(4).textContent = user.mobilenumber;
            row.insertCell(5).textContent = user.age;
        });
    } catch (err) {
        console.error(`Error fetching users: ${err}`);
    }
}

window.onload = getAllUsers;