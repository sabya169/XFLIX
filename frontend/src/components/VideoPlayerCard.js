import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./VideoPlayerCard.css";

function VideoPlayerCard({ videos, handleSelect }) {
  return (
    <Link to={`/VideoPlayer/${videos._id}`}>
      <Card className="card" sx={{ maxWidth: 345 }} onClick={handleSelect}>
        <CardMedia
          component="img"
          height="140"
          image={videos.previewImage}
          alt={videos.genre}
        />
        <CardContent>
          <Typography className="text">{videos.title}</Typography>
          <Typography className="text">{videos.releaseDate}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
export default VideoPlayerCard;
