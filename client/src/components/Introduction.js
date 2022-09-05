import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
const Introduction = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 2, px: 1 }}>
      <List sx={{ listStyleType: "disc" }}>
        <ListSubheader
          sx={{
            fontWeight: 700,
            lineHeight: "24px",
            fontSize: "16px",
            color: "black",
          }}
        >
          Survey-easy提供一個簡單的平台做議題調查，使用者可以建立議題並且得到其他人回饋。使用方式如下方說明:
        </ListSubheader>
        <ListItem>1: 登入網站(Login with Google)。</ListItem>
        <ListItem>2: 建立一個調查，並且可以填入指定的信箱傳送此調查。</ListItem>
        <ListItem>3: 收到信件者可以評論信件中的調查(同意或是不同意)。</ListItem>
        <ListItem>4: Survey-easy即可以看到同意跟不同意的人數。</ListItem>
      </List>
    </Box>
  );
};

export default Introduction;
