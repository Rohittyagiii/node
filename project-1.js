const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

// REST API
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "pending" });
    });

app.post('/api/users', (req, res) => {
    const body = req.body;

    users.push({ ...body, id: users.length + 1 });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.json({ status: "error" });
        }
        return res.json({ status: "success", id: users.length });
    });
});

// Server
app.listen(4000, () => {
    console.log('Server Started');
});
