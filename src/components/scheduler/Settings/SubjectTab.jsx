import { Delete } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

function SubjectTab() {
  const [newGrade, setNewGrade] = useState(1);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectCode, setNewSubjcetCode] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState();
  const [lecturers, setLecturers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchLecturers();
    fetchSubjects();
  }, []);

  const deleteSubject = async (id) => {
    const body = {
      id: id,
    };
    const resDelete = await fetch("/api/subject", {
      method: "DELETE",
      body: JSON.stringify(body),
    });
    fetchSubjects();
  };
  const fetchLecturers = async () => {
    const resLecturers = await fetch("/api/lecturer", {
      cache: "no-cache",
    });
    const lecturers = await resLecturers.json();
    setLecturers(lecturers);
  };
  const fetchSubjects = async () => {
    const resSubjects = await fetch("/api/subject", {
      cache: "no-cache",
    });
    const subjects = await resSubjects.json();
    setSubjects(subjects);
  };
  const saveNewSubject = async () => {
    const body = {
      name: newSubjectName,
      grade: newGrade,
      code: newSubjectCode,
      lecturer: selectedLecturer,
    };
    const resNewSubject = await fetch("/api/subject", {
      method: "POST",
      body: JSON.stringify(body),
    });
    fetchSubjects();
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <TextField
          helperText="Please enter subject name"
          id="demo-helper-text-misaligned"
          label="Subject Name"
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        <TextField
          helperText="Please enter code"
          id="demo-helper-text-misaligned"
          label="Subject Code"
          onChange={(e) => setNewSubjcetCode(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Grade</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newGrade}
            label="Age"
            onChange={(e) => setNewGrade(e.target.value)}
            required
          >
            <MenuItem value={1}>1.Sınıf</MenuItem>
            <MenuItem value={2}>2.Sınıf</MenuItem>
            <MenuItem value={3}>3.Sınıf</MenuItem>
            <MenuItem value={4}>4.Sınıf</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Lecturer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLecturer}
            label="Lecturer"
            onChange={(e) => setSelectedLecturer(e.target.value)}
          >
            {lecturers.map((lecturer) => (
              <MenuItem value={lecturer._id} key={lecturer._id}>
                {lecturer.name} {lecturer.surname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={saveNewSubject}>
          Save
        </Button>
      </div>
      <List className="flex flex-wrap">
        {subjects.map((subject) => (
          <ListItem className="w-1/2" key={subject._id} disablePadding>
            <ListItemText
              primary={subject.name + " (" + subject.code + ")"}
              secondary={
                subject.lecturer.name +
                " " +
                subject.lecturer.surname +
                " (" +
                subject.grade +
                ".sınıf) "
              }
            />
            <ListItemIcon
              className="cursor-pointer"
              onClick={() => deleteSubject(subject._id)}
            >
              <Delete />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default SubjectTab;
