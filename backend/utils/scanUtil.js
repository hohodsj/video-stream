const fs = require('fs');
const {getVideoDurationInSeconds} = require('./videoProperties')
const {glob} = require('glob');
const CollectionSchema = require('../models/collectionSchema');
const VideoSchema = require('../models/videoSchema');
var path = require('path');

let Files = []

module.exports.scanVideosInPath = async(dir) => {
    mountedPath = dir
    shareDir = ""
    const file = fs.readFileSync('/app/Videos/Anime/Test/1.mp4')
    console.log(file)
    await getFileDetails('/app/Videos/Anime/Test/1.mp4')
    // ThroughDirectory('/app/Videos')
    // console.log(Files)
}

function ThroughDirectory(Directory) {
  fs.readdirSync(Directory).forEach(File => {
      const Absolute = path.join(Directory, File);
      if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
      else return Files.push(Absolute);
  });
}

async function getFileDetails(absPath) {
  const lastSlash = absPath.lastIndexOf('/');
  const parentDirectory = absPath.substring(0, lastSlash)
  const fileName = absPath.substring(lastSlash+1)
  const getDurationTask = getVideoDurationInSeconds(absPath)
  // console.log(`${parentDirectory} ${fileName} ${time}`)

  // try to find collection from db
  let collectionFromDB = await CollectionSchema.findOne({path: parentDirectory})
  if (!collectionFromDB) {
    const collection = generateCollection(parentDirectory)
    collectionFromDB = await collection.save()
  }

  const duration = await getDurationTask

  // try to find video from db
  let videoFromDB = await VideoSchema.findOne({path: absPath})
  if (!videoFromDB) {
    const video = generateVideo(absPath, duration, collectionFromDB)
    videoFromDB = await video.save();
    await CollectionSchema.findOneAndUpdate(
      {path: parentDirectory},
      {$push: {videos: videoFromDB}})
  }
  console.log(`path: ${path} with video duration: ${duration} has been added to collection: ${collectionFromDB.path}`)
}

function generateCollection(path, order=-1, coverImg=''){
  return new CollectionSchema({
    path: path,
    order: order,
    coverImg: coverImg,
    videos: []
  })
}

function generateVideo(path, duration, collectionSchema, order=-1) {
  return new VideoSchema({
    path:path,
    duration: duration,
    order: order,
    collectionSchema: collectionSchema
  })
}