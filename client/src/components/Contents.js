import React from "react";
import { Link, useParams } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const Contents = () => {
  const { id } = useParams();
  return (
    <div>
      <SurveyList />
      {id}
      <Link to="/surveys/new">
        <AddCircleIcon
          sx={{ fontSize: 48 }}
          className="text-blue-600  fixed bottom-2 right-4 z-10 "
        />
      </Link>
    </div>
  );
};

export default Contents;
