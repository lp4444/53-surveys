import * as React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import axios from "axios";

const sendSurvey = async (values, navigate) => {
  const res = await axios.post("/api/surveys", values);
  console.log(res);
  navigate("/surveys");
};
const SurveyFormReview = ({ formValues, onCancel }) => {
  let navigate = useNavigate();
  React.useEffect(() => {}, []);
  const ReviewContents = () => {
    return (
      <List
        sx={{
          width: "100%",
          // maxWidth: 720,
          bgcolor: "background.paper",
        }}
      >
        <ListItem>
          <ListItemText primary="survey title" secondary={formValues.subject} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            primary="survey body"
            sx={{ wordWrap: "breakWord" }}
            secondary={formValues.body}
          />
        </ListItem>{" "}
        <Divider component="li" />
        <ListItem>
          <ListItemText
            primary="recipient list (email)"
            secondary={
              formValues.recipients &&
              formValues.recipients.split(",").join(", ")
            }
          />
        </ListItem>{" "}
        <Divider component="li" />
      </List>
    );
  };

  return (
    <div className=" mx-auto px-1 pt-3">
      <ReviewContents />
      <div className="flex gap-2">
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          onClick={() => sendSurvey(formValues, navigate)}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
