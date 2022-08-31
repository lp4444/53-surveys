// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";

// const SurveyList = () => {
//   React.useEffect(() => {
//     document.title = `You clicked${survey.title} imes`;
//   });
//   return <div>i am list</div>;
// };

// export default SurveyList;

import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";
import { flash } from "react-universal-flash";
import dayjs from "dayjs";
import axios from "axios";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest
//   })
// }));

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    error={meta.touched && !!meta.error}
    helperText={meta.touched ? meta.error : ""}
    onChange={(event, value) => input.onChange(event.target.value)}
  />
);

const SurveyList = ({
  fetchSurveys,
  surveys,
  auth,
  form,
  handleSubmit,
  submitting,
}) => {
  const { userId } = useParams(); //userId

  const [bin, setBin] = React.useState(false);

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

  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [curSurvey, setCurSurvey] = React.useState("");
  const handleClickOpen = (survey) => {
    const { _user, _id } = survey;
    setCurSurvey(_id);
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
          curSurvey,
          ...form.emailForm.values,
        });
        flash("success submit", 2400, "success");
      }
    } catch (e) {
      flash(" failure submit", 2400, "error");
    } finally {
    }
    console.log(form.emailForm.values);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    fetchData();
    console.log(auth);
  }, [userId, bin]);

  return (
    <>
      <div className="grid grid-rows-1 gap-1 mt-3">
        {surveys
          .sort((a, b) => dayjs(b.dateSent).diff(a.dateSent))
          .map((survey) => {
            return (
              <Card
                className="mx-auto"
                sx={{ width: 545 }}
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
                  <div className="text-blue-700">
                    <ThumbUpAltIcon />
                    <a>{survey.yes}</a>
                    <ThumbDownOffAltIcon />
                    <a>{survey.no}</a>
                  </div>
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
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onEmailSubmit)}>
          <DialogTitle>Vote</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To vote to this survey, please enter your email address here. We
              will send a voting email to you.
            </DialogContentText>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            /> */}
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

// export default connect(mapStateToProps, actions)(SurveyList);

export default reduxForm({
  form: "emailForm",
  destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(SurveyList));
