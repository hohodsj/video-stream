const express = require('express')
const {findCurrentPlayingVideo} = require('./utils/playlist')
const {scanVideosInPath} = require('./utils/scanUtil')
const mongoose = require('mongoose')

const dbUrl = "mongodb://root:example@mongo"
mongoose.connect(dbUrl,{
    dbName: 'VideoStream'
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})
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

// Get current playing list and video and time
app.get("/videotime/:playlist", (req, res) => {
    res.json({message: "TODO api call before passing into /video/:playlist btw this should rename to /video/:playlist/:filename i think"})
})

// Play video given name of the list
app.get('/videos/:playlist', (req, res) => {
    const playlist = req.params.playlist;
    findCurrentPlayingVideo(playlist, req.headers.range, res)
})

app.get("/scan", async(req, res) => {
    const files = await scanVideosInPath("//192.168.50.189/WD2TB/Videos")
    // console.log(`files:${files}`)
    res.json({message: "TODO scan drive to generate playlists and insert to db"})
})

const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
})