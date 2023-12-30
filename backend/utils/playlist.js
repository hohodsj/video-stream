const {getVideoDurationInSeconds} = require('./videoProperties')


const videoFilesMap = [
    {"path": "videos/1.mp4"},
    {"path": "videos/2.mp4"},
    {"path": "videos/3.mp4"},
]

module.exports.findCurrentPlayingVideo = async(playList) => {
    // sort videos under playList by name
    const files = videoFilesMap.map(x => x["path"])
    const seconds = await getVideoDurationInSeconds(files[0])
}