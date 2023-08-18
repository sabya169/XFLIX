import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
} from "@mui/material";
import "./dialog.css";
import { BaseURL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DialogItem() {
  const navigate = useNavigate();

  const [link, SetLink] = useState("");
  const [thumbinal, setThumbinal] = useState("");
  const [title, SetTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");

  //--------------------------------------------------------------
  const [open, setOpen] = useState(true);
  //--------------------------------------------------------------

  //-------------------------------------------------------------
  const handleClose = () => {
    setOpen(false);
    // navigate("/")
  };

  const handelSubmit = async () => {
    let uploadVideoData = [
      { videoLink: { link } },
      { previewImage: { thumbinal } },
      { title: { title } },
      { category: { genre } },
      { ageCategory: { age } },
      { releaseDate: { date } },
    ];
    // console.log(uploadVideoData)
    let response = await axios.post(BaseURL);
    console.log("post request response", response);
    setOpen(false);
  };
  //--------------------------------------------------------------

  const handleLink = (e) => {
    // console.log(e.target.value)
    SetLink(e.target.value);
  };
  const handleThumbinal = (e) => {
    setThumbinal(e.target.value);
  };
  const handleTitle = (e) => {
    SetTitle(e.target.value);
  };
  const handleGenre = (e) => {
    setGenre(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleDate = (e) => {
    // console.log(e.target.value)
    setDate(e.target.value);
  };

  //-----------------------------------------------------------

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <b>Upload Video</b>
        </DialogTitle>
        <DialogContent sx={{ width: "20rem" }}>
          <TextField
            value={link}
            sx={{ width: "20rem" }}
            id="outlined-input"
            label="Video Link"
            type="Video Link"
            autoComplete="current-password"
            helperText="This link will be used to derive the video"
            onChange={handleLink}
          />
          <TextField
            onChange={handleThumbinal}
            value={thumbinal}
            sx={{ width: "20rem" }}
            id="outlined-input"
            label="Thumbinal image Link"
            type="Thumbinal image Link"
            helperText="This link will be used to preview the thumbinal image"
          />
          <TextField
            onChange={handleTitle}
            value={title}
            sx={{ width: "20rem" }}
            id="outlined-input"
            label="Title"
            type="Title"
            helperText="This title will be representative text for video"
          />
          <TextField
            value={genre}
            onChange={handleGenre}
            sx={{ width: "20rem" }}
            label="Genre"
            select
            helperText="Genre will help you to categorize your video"
          >
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="sports">Sports</MenuItem>
            <MenuItem value="comedy">Comedy</MenuItem>
            <MenuItem value="lifestyle">LifeStyle</MenuItem>
          </TextField>

          <TextField
            value={age}
            onChange={handleAge}
            sx={{ width: "20rem" }}
            label="Age Group"
            select
            helperText="Age group will help you to categorize your video"
          >
            <MenuItem value="+7">7+</MenuItem>
            <MenuItem value="+12">12+</MenuItem>
            <MenuItem value="+16">16+</MenuItem>
            <MenuItem value="+18">18+</MenuItem>
          </TextField>

          <TextField
            type="date"
            sx={{ width: "20rem" }}
            onChange={handleDate}
          />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={handelSubmit}
          >
            Submit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogItem;
