import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./VideoPlayer.css";
import VideoPlayerCard from "./VideoPlayerCard";
import Grid from "@mui/material/Grid";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {BaseURL} from "../config"

function VideoPlayer() {
  const [allVideo, setAllVideo] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  //  const [paramData,setParamData] = useState("")

  //----------------PARAM--------------------
  const params = useParams();
  // console.log("params",params)
  const paramsId = params.id;

  //---------------------------------------------

  //-----------------------------URL----------------------------------------------
  const URL = BaseURL;
    
  //------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  const performApiCall = async () => {
    // console.log("perform api call");
    // setParamData(params.id)
    let response = await axios.get(URL);
    // console.log(response.data.videos);
    setAllVideo(response.data.videos);
  };

  // const performVideoApiCall = async () => {

  //   console.log("perform video api call")
  //   let url = URL + `/:${params.id}`;
  //   console.log("test",url)
  //   const response = await axios.get(url);
  //   console.log("vdo link ",response.data.videoLink);
  //   setVideoLink("https://www." + response.data.videoLink);
  // };

  useEffect(() => {
    // performVideoApiCall();
    performApiCall();
  }, [paramsId]);

  useEffect(() => {
    let currentVideo = allVideo.find((video) => video._id === paramsId);
    setCurrentVideo(currentVideo);
  }, [allVideo]);
  //----------------------------------------------------------------------------------

  const upVote = async() => {
    let url = URL + `/${paramsId}/votes`
    console.log("upvote patch utl",url)
    let response = await axios.patch(url)
    console.log(response)
  };

  const downVote = async() => {
    let url = URL + `/${paramsId}/votes`
    let response = await axios.patch(url)
    console.log(response)
  };

  //--------------------------------------------------------------------
  // useEffect(()=> {
  //   performVideoApiCall();
  //   performApiCall();
  // }, [paramData]);

  // const paramSelect = ()=>{
  //   console.log("inside click")
  //   performVideoApiCall()
  //   setParamData(params.id)

  // }

  //  console.log("paramdata",paramData)
  //  console.log("videoLink",videoLink)
  //-----------------------------------------------------------------------
  // console.log("test curr",currentVideo.viewCount)
  return (
    <div className="body">
      {currentVideo && (
        <iframe
          controls
          className="iframe"
          src={`https://www.${currentVideo.videoLink}`}
          title={currentVideo.title}
          width="1000px"
          height="400px"
        ></iframe>
      )}
      <div>
        <span></span>
        <ThumbUpAltIcon
          className="icon"
          sx={{ color: "grey" }}
          onClick={upVote}
        />{" "}
        <span></span>
        <ThumbDownAltIcon
          className="icon"
          sx={{ color: "grey" }}
          onClick={downVote}
        />
      </div>

      <div className="card-container">
        <Grid container spacing={2}>
          {allVideo.map((data) => {
            return (
              <Grid item xs={6} md={3} key={data._id}>
                <VideoPlayerCard videos={data} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
export default VideoPlayer;
