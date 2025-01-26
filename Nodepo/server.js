const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "praktisan",
    password: "passwordkosapostgresql",
});

app.get("/", async (req, res) => {
    const query = `SELECT * FROM users ORDER BY userid DESC`;

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(`Error executing query ${err}`);
        res.status(500).json({ message: "Error fetching data galing sa deytabeys", error: err.message });
    }
});

app.post("/insert", async (req, res) => {
    const { firstname, lastname, emailaddress, mobilenumber, age } = req.body;

    if (!firstname || !lastname || !emailaddress || !mobilenumber || !age) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const values = [firstname, lastname, emailaddress, mobilenumber, age];
    const query = `
        INSERT INTO users (firstname, lastname, emailaddress, mobilenumber, age)
        VALUES ($1, $2, $3, $4, $5);`;

    try {
        await pool.query(query, values);
        res.status(200).json({ message: "Successfully inserted into the database!" });
    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ message: "Data insertion failed.", error: err.message });
    }
});

app.put("/update", async (req, res) => {
    const { firstname, lastname, emailaddress, mobilenumber, age, userid } = req.body;

    if (!firstname || !lastname || !emailaddress || !mobilenumber || !age) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const values = [ firstname, lastname, emailaddress, mobilenumber, age, userid ];
    const query = `
        UPDATE users SET firstname = $1, lastname = $2, emailaddress = $3, mobilenumber = $4, age = $5 WHERE userid = $6;
    `

    try {
        await pool.query(query, values);
        res.status(200).json({ message: "User updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

app.delete("/delete", async (req, res) => {
    const { userid } = req.body;

    if (!userid) {
        return res.status(400).json({ message: "User ID is required." });
    }

    const query = `
        DELETE FROM users WHERE userid = $1;
    `;

    try {
        await pool.query(query, [userid]);
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});


app.listen(PORT, () => 
    console.log(`Server running at: http://localhost:${PORT}`)
);
