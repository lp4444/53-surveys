import React from "react";
import Alert from "@mui/material/Alert";

const Message = ({ type, content, deleteFlash }) => (
  <Alert severity={type} onClose={deleteFlash}>
    {content}
  </Alert>
);

export default Message;
