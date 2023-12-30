const express = require('express')
const {findCurrentPlayingVideo} = require('./utils/playlist')

const app = express()


app.get('/', (req,res) => {
    res.send('hi');
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Get playlist from db
app.get("/playlists", (req,res) => {
    res.json({message: "TODO: connect to db and fetch list"})
})

// Play video given name of the list
app.get('/videos/:playlist', (req, res) => {
    const playlist = req.params.playlist;
    findCurrentPlayingVideo(playlist)
})

app.get("/scan", async(req, res) => {
    res.json({message: "TODO scan drive to generate playlists and insert to db"})
})

const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
})