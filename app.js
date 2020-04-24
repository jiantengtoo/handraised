navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector('#video');
let model;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.5,  // reduce input image size for gains in speed.
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia({ video: {} }, stream => {
      video.srcObject = stream;
      runDetection()
    },
      err => console.log(err)
    );
  }
})

const runDetection = () => {
  model.detect(video).then(predictions=>{
    console.log('prediction:' + predictions)
    try {
      let p = predictions[0].score
      document.querySelector('#label').innerHTML = "<span class='label success'>Hand Raised!</span>";
    }
    catch(err) {
      document.querySelector('#label').innerHTML = "<span class='label danger'>No Hand!</span>";
    }
    requestAnimationFrame(runDetection);
  })
}

handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});