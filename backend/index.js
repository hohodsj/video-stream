const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.send('hi');
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
})