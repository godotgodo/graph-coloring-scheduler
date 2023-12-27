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
  const [newLecturerName, setNewLecturerName] = useState("");
  const [newLecturerSurname, setNewLecturerSurname] = useState("");
  const [lecturers, setLecturers] = useState([]);
  useEffect(() => {
    fetchLecturers();
  }, []);
  const saveNewLecturer = async () => {
    const newLecturer = {
      name: newLecturerName,
      surname: newLecturerSurname,
    };
    const res = await fetch("http://localhost:3000/api/lecturer", {
      method: "POST",
      body: JSON.stringify(newLecturer),
    });
    fetchLecturers();
  };
  const fetchLecturers = async () => {
    const resLecturers = await fetch("http://localhost:3000/api/lecturer", {
      cache: "no-cache",
    });
    const lecturers = await resLecturers.json();
    setLecturers(lecturers);
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
                <div className="flex flex-col gap-5">
                  <TextField
                    helperText="Please enter lecturer name"
                    id="demo-helper-text-misaligned"
                    label="Lecturer name"
                    onChange={(e) => setNewLecturerName(e.target.value)}
                  />
                  <TextField
                    helperText="Please enter lecturer surname"
                    id="demo-helper-text-misaligned"
                    label="Lecturer surname"
                    onChange={(e) => setNewLecturerSurname(e.target.value)}
                  />
                  <Button variant="outlined" onClick={saveNewLecturer}>
                    Save
                  </Button>
                </div>
                <List>
                  {lecturers.map((lecturer) => (
                    <ListItem key={lecturer._id} disablePadding>
                      <ListItemText
                        primary={lecturer.name + " " + lecturer.surname}
                      />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
              <TabPanel value="subjects">Subjects</TabPanel>
              <TabPanel value="class">Class</TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}
