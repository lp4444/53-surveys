import * as React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { flash } from "react-universal-flash";
import axios from "axios";

const sendSurvey = async (values, navigate) => {
  try {
    await axios.post("/api/surveys", values);
    flash("successful add", 2400, "success");
  } catch (e) {
    flash("error:" + e, 2400, "error");
  } finally {
    navigate("/surveys");
  }
};
const SurveyFormReview = ({ formValues, onCancel }) => {
  let navigate = useNavigate();

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
    <Box sx={{ px: 1, pt: 2 }}>
      <ReviewContents />
      <Stack spacing={1} direction="row">
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
      </Stack>
    </Box>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, null)(SurveyFormReview);
