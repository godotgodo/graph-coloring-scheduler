"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useState, useEffect } from "react";
import LecturerTab from "./LecturerTab";
import SubjectTab from "./SubjectTab";
import ClassTab from "./ClassTab";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("lecturer");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ width: "100%" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab value="lecturer" label="Lecturer" />
                <Tab value="subjects" label="Subjects" />
                <Tab value="class" label="Class" />
              </Tabs>
              <TabPanel value="lecturer">
                <LecturerTab />
              </TabPanel>
              <TabPanel value="subjects">
                <SubjectTab />
              </TabPanel>
              <TabPanel value="class">
                <ClassTab />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}
