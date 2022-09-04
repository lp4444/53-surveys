import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Contents = () => {
  return (
    <>
      <SurveyList />
      <Link to="/surveys/new">
        <AddCircleIcon
          sx={{
            fontSize: 48,
            color: "#2590EB",
            position: "fixed",
            right: 8,
            bottom: 4,
            zIndex: 10,
          }}
        />
      </Link>
    </>
  );
};

export default Contents;
