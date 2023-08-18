import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./GeneralPanel.css";
import { TextField, MenuItem } from "@mui/material";

function GeneralPanel({
  handleAge,
  handleCategory,
  buttonCatData,
  ageCatData,
  handleChange,
}) {
  return (
    <Box className="gen-panel-main">
      <Box className="first-row">
        <Box>
          {buttonCatData.map((a) => {
            return (
              <Button
                variant="outlined"
                key={Object.keys(a)}
                onClick={handleCategory}
                value={Object.keys(a)}
                className="btn"
                sx={{
                  backgroundColor: a[Object.keys(a)] ? "grey" : "",
                  borderColor: "white",
                  margin: "5px",
                }}
              >
                {Object.keys(a)}
              </Button>
            );
          })}
        </Box>

        <select
        className="dropdown"
          onChange={handleChange}
          
        >
          <option selected value="">Release Date</option>
          <option value="viewCount">View Count</option>
        </select>
      </Box>

      <Box margin={1}>
        {ageCatData.map((a) => {
          return (
            <Button
              variant="outlined"
              onClick={handleAge}
              className="btn"
              value={Object.keys(a)}
              sx={{
                backgroundColor: a[Object.keys(a)] ? "grey" : "",
                borderColor: "white",
                margin: "5px",
              }}
            >
              {Object.keys(a)}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
export default GeneralPanel;
