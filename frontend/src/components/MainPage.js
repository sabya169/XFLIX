import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import GeneralPanel from "./GeneralPanel";
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import "./MainPage.css";
import { TextField } from "@mui/material";
import { BaseURL } from "../config";
// import { useHistory } from "react-router-dom";

function MainPage() {
  // const history = useHistory()

  //------------------USE STATE SECTION-------------------------------------
  //------------contain all video data-----------------------------
  const [videoData, setVideoData] = useState([]);
  // const [viewCount,setViewCount] = useState("")
  //-----------------button data-------------------------------
  const [buttonCat, setButtonCat] = useState([
    { "All genre": true },
    { Education: false },
    { Sports: false },
    { Comedy: false },
    { Lifestyle: false },
  ]);
  const [ageCat, setAgeCat] = useState([
    { "Any age group": true },
    { "7+": false },
    { "12+": false },
    { "16+": false },
    { "18+": false },
  ]);

  //----------------------debounce-----------------
  const [debounceTimeout, setDebounceTimeout] = useState(0);

  //---------------------------------------------
  const [debounceValue, setDebounceValue] = useState("");
  const [genre, setGenre] = useState([]);
  const [age, setAge] = useState("");
  //------------------universal url------------------------------------
  const URL = BaseURL;

  //--------------------load page initially-----------------------------------
  const performAPIcall = async () => {
    let response = await axios.get(URL);
    console.log(response);
    setVideoData(response.data.videos);
  };

  useEffect(() => {
    performAPIcall();
  }, []);
  //----------------------filter category-----------------------------------------------------

  //---------------------------------
  const filterApiCall = async () => {
    // console.log(debounceValue);
    let a = genre.join();
    let b = age.split("");
    b.pop();
    let c = b.join("");
    console.log(a, c);
    let url = URL;

    if (genre[0] === undefined && age === "" && debounceValue === "") {
      url = URL;
    } else if (age === "" && debounceValue === "") {
      url = URL + "?genres=" + a;
    } else if (genre[0] === undefined && debounceValue === "") {
      url = URL + "?contentRating=" + c + "%2B";
    } else if (age === "" && genre[0] === undefined) {
      url = URL + "?title=" + debounceValue;
    } else if (genre[0] === undefined) {
      url = URL + "?title=" + debounceValue + "&contentRating=" + c + "%2B";
    } else if (age === "") {
      url = URL + "?title=" + debounceValue + "&genres=" + a;
    } else if (debounceValue === "") {
      url = URL + "?genres=" + a + "&contentRating=" + c + "%2B";
    } else {
      url =
        URL +
        "?title=" +
        debounceValue +
        "&genres=" +
        a +
        "&contentRating=" +
        c +
        "%2B";
    }
    console.log(url);
    let response = await axios.get(url);
    // console.log(response.data.videos)
    setVideoData(response.data.videos);
  };
  // console.log("test",genre)
  //----------------------------------
  const SelectCategory = (event) => {
    let value = event.target.value;

    //--------------for highlighting the button--------------------
    for (let i = 0; i < buttonCat.length; i++) {
      if (value !== "All genre") {
        if (buttonCat[i][value] === false) {
          buttonCat[i][value] = true;
          buttonCat[0]["All genre"] = false;
        } else if (buttonCat[i][value] === true) {
          buttonCat[i][value] = false;
        }
      } else if (value === "All genre") {
        buttonCat[i][Object.keys(buttonCat[i]).toString()] = false;
        buttonCat[0]["All genre"] = true;
      }
    }
    setButtonCat(buttonCat);
    //-----------------------------------------------------------------

    //----------category array------------
    if (value !== "All genre") {
      if (!genre.length) {
        // console.log("inside if", value);
        setGenre([value]);
      } else {
        if (genre.includes(value)) {
          let index = genre.indexOf(value);
          let a = genre.filter((b, i) => i != index);
          // genre.splice(index,1)
          // console.log("test11",genre)
          setGenre(a);
        } else {
          setGenre([...genre, value]);
        }
      }
    } else {
      setGenre([]);
    }
    // console.log("genre", genre);
  };
  useEffect(() => {
    filterApiCall();
  }, [genre, age, debounceValue]);

  const SelectAge = (event) => {
    let value = event.target.value;
    //----------------for highlighting the button-----------------

    if (value === "Any age group") {
      for (let i = 0; i < ageCat.length; i++) {
        ageCat[i][Object.keys(ageCat[i]).toString()] = false;
        ageCat[0][value] = true;
      }
    } else if (value !== "Any age group") {
      for (let i = 0; i < ageCat.length; i++) {
        ageCat[i][Object.keys(ageCat[i]).toString()] = false;
        // ageCat[1][value] = true;
      }
      for (let j = 0; j < ageCat.length; j++) {
        if (Object.keys(ageCat[j]).toString() === value) {
          console.log(ageCat[j][value]);
          if (ageCat[j][value] === true) {
            console.log("true here");
            ageCat[j][value] = false;
          } else {
            console.log("false here");
            ageCat[j][value] = true;
          }
        }
      }
    }

    setAgeCat(ageCat);

    //------------------------------------------------------------
    if (value !== "Any age group") {
      setAge(value);
    } else {
      setAge("");
    }

    // console.log("age", a2);
    // filterApiCall();
  };
  const debounceSearch = (e, debounceTimeout) => {
    // debounceValue = e.target.value;
    // setDebounceValue(e.target.value)
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setDebounceValue(e.target.value);
      // filterApiCall(e.target.value);
    }, 1000);
    setDebounceTimeout(timeout);
  };

  //-----------------------------------------------------------

  // const viewCopuntAPICall = async()=>{
  //   let response = await axios.get(URL+"?sortBy=viewCount")
  //   setVideoData(response.data.videos)
  // }

  // useEffect(()=>{
  // viewCopuntAPICall()
  // },[viewCount])

  //   const handleCount = (e)=>{
  //     setViewCount(e.target.value)
  //   }

  const handleCount = async (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      let response = await axios.get(URL);
      console.log(response);
      setVideoData(response.data.videos);
    } else {
      let response = await axios.get(URL + "?sortBy=viewCount");
      console.log(response);
      setVideoData(response.data.videos);
    }
  };

  //--------------------------------------------------------------
  // const handleClick = ()=>{
  //   console.log("sabya")
  //   history.push("/")
  // }

  return (
    <div className="main-container">
      <Header>
        <TextField
          sx={{ backgroundColor: "rgb(36, 35, 35)", height: "2.3rem" }}
          size="small"
          fullWidth
          className="search-field"
          placeholder="search"
          onChange={(e) => debounceSearch(e, debounceTimeout)}
        />
      </Header>
      <GeneralPanel
        handleCategory={SelectCategory}
        handleAge={SelectAge}
        buttonCatData={buttonCat}
        ageCatData={ageCat}
        handleChange={handleCount}
      />
      <div className="card-container">
        <Grid container spacing={2}>
          {videoData.map((data) => {
            return (
              <Grid item xs={6} md={3} key={data._id}>
                <VideoCard videos={data} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      {/* <button onClick={handleClick}>click</button> */}
    </div>
  );
}

export default MainPage;
