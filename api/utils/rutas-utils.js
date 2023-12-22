const checkFFmpeg=require("./ffmpeg.js");
const express = require('express');
const app = express();

app.get("/checkffmpeg",(req,res) => {
    checkFFmpeg();
    res.status(200);
})

module.exports=app;