const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req,res,next) => {
    console.log("Hello From Middleware 1");
    next();
});

app.use((req,res,next) => {
    console.log("Hello From Middleware 2");
    // return res.end('Hey')    
    next();
});

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
        if(!user) return res.status(404).json({err: "User not foud"})
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
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ msg : "All fields are required    "})
    }
    users.push({ ...body, id: users.length + 1 });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.json({ status: "error" });
        }
        return res.status(201).json({ status: "success", id: users.length });
    });
});

// Server
app.listen(4000, () => {
    console.log('Server Started');
});
