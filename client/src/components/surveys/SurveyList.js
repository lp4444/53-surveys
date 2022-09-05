import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";
import { flash } from "react-universal-flash";
import dayjs from "dayjs";
import axios from "axios";

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    error={meta.touched && !!meta.error}
    helperText={meta.touched ? meta.error : ""}
    onChange={(event, value) => input.onChange(event.target.value)}
  />
);

const SurveyList = (props) => {
  const { fetchSurveys, surveys, auth, form, handleSubmit, submitting } = props;

  const { userId } = useParams(); //userId
  const [bin, setBin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [curSurvey, setCurSurvey] = React.useState({});

  async function fetchData() {
    await fetchSurveys(userId);
  }
  const deleteSurvey = async (survey) => {
    const { _user, _id } = survey;
    try {
      const res = await axios.delete(`/api/surveys/${_id}`);
      flash("delete done", 2400, "success");
      setBin(!bin);
    } catch (e) {
      flash(e, 2400, "failure");
    }
  };

  const handleClickOpen = (survey) => {
    const { _id, subject } = survey;
    setCurSurvey({ _id, subject });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onEmailSubmit = async () => {
    setOpen(false);
    try {
      if (form.emailForm.values) {
        await axios.post("/api/surveys/vote", {
          _id: curSurvey._id,
          ...form.emailForm.values,
        });
        flash("success submit", 2400, "success");
      }
    } catch (e) {
      flash(" failure submit" + e, 2400, "error");
    } finally {
    }
    console.log(form.emailForm.values);
  };

  React.useEffect(() => {
    fetchData();
  }, [userId, bin]);

  return (
    <>
      {surveys.length ? (
        <Stack
          spacing={2}
          sx={{ mt: 2 }}
          alignItems="center"
          direction="column"
        >
          {surveys
            .sort((a, b) => dayjs(b.dateSent).diff(a.dateSent))
            .map((survey) => {
              return (
                <Card
                  sx={{ maxWidth: 545, width: "100%" }}
                  key={survey.subject}
                >
                  <CardHeader
                    title={survey.subject}
                    subheader={dayjs(survey.dateSent).format("MMMM D, YYYY")}
                  />

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {survey.body}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Box sx={{ color: "#1D4ED8" }}>
                      <ThumbUpAltIcon />
                      <a>{survey.yes}</a>
                      <ThumbDownOffAltIcon />
                      <a>{survey.no}</a>
                    </Box>
                    {auth._id === survey._user && (
                      <Tooltip title="Delete">
                        <IconButton
                          style={{ marginLeft: "auto" }}
                          color="error"
                          aria-label="delete"
                          onClick={() => deleteSurvey(survey)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Vote">
                      <IconButton
                        style={{
                          marginLeft: auth._id !== survey._user && "auto",
                        }}
                        color="success"
                        aria-label="Vote"
                        onClick={() => handleClickOpen(survey)}
                      >
                        <HowToVoteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              );
            })}
        </Stack>
      ) : (
        <Typography sx={{ mt: 1 }} align="center" variant="h2" component="h2">
          No Content
        </Typography>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onEmailSubmit)}>
          <DialogTitle>Vote({curSurvey.subject})</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To vote to this survey, please enter your email address here. We
              will send a voting email to you.
            </DialogContentText>

            <Field
              autoFocus
              name="email"
              label="Email Address"
              variant="standard"
              margin="normal"
              type="email"
              fullWidth
              component={TextFieldAdapter}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
function mapStateToProps({ surveys, auth, form }) {
  return { surveys, auth, form };
}

export default reduxForm({
  form: "emailForm",
  destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(SurveyList));
