import { Delete } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

export default function LecturerTab() {
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
  const deleteLecturer = async (id) => {
    const body = {
      id: id,
    };
    const resDelete = await fetch("http://localhost:3000/api/lecturer", {
      method: "DELETE",
      body: JSON.stringify(body),
    });
    fetchLecturers();
  };
  return (
    <>
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
      <List className="w-1/2">
        {lecturers.map((lecturer) => (
          <ListItem key={lecturer._id} disablePadding>
            <ListItemText primary={lecturer.name + " " + lecturer.surname} />
            <ListItemIcon
              className="cursor-pointer"
              onClick={() => deleteLecturer(lecturer._id)}
            >
              <Delete />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </>
  );
}
