const {getVideoDurationInSeconds} = require('./videoProperties')
const ffmpeg = require('ffmpeg')
const fs = require('fs')


const videoFilesMap = [
    {"path": "videos/1.mp4"},
    {"path": "videos/2.mp4"},
    {"path": "videos/3.mp4"},
]

module.exports.findCurrentPlayingVideo = async(playList, range, res) => {
    // sort videos under playList by name
    const files = videoFilesMap.map(x => x["path"])

    const v1time = await getVideoDurationInSeconds(files[0])
    const v2time = await getVideoDurationInSeconds(files[1])
    const v3time = await getVideoDurationInSeconds(files[2])
    console.log(`v1time:${v1time} v2time:${v2time} v3time:${v3time}`)
    findCurrentPlayingVideoTimeTest(files, range, res)
}

findCurrentPlayingVideoTimeTest = (files, range, res) => {
    // individual video
    filePath = files[0]
    const stat = fs.statSync(filePath)
    const fileSize = stat.size;
    if(range){
        const parts = range.replace(/bytes=/,'').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end  - start + 1;
        const file = fs.createReadStream(filePath, {start,end})
        const head = {
            'Content-Range' :  `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type' : 'video/mp4'
        };
        res.writeHead(206, head)
        file.pipe(res)
    } 
}