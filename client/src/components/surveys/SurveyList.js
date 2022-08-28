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
import * as actions from "../../actions";

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

const SurveyList = ({ fetchSurveys, surveys, auth }) => {
  const { userId } = useParams(); //userId

  async function fetchData() {
    await fetchSurveys(userId);
  }
  const deleteSurvey = async (survey) => {
    const { _user, _id } = survey;
    await axios.delete(`/api/surveys/${_id}`);
  };

  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (survey) => {
    const { _user, _id } = survey;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    fetchData();
    console.log(auth);
  }, [userId]);

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
        <DialogTitle>Vote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(mapStateToProps, actions)(SurveyList);
