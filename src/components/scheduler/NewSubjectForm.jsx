import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import getGivenSubjects from "@/app/actions";
import { Days, Times } from "@/utils/settings";

export default function MultiActionAreaCard({
  grade,
  day,
  startTime,
  endTime,
  clearSelectedCheckboxes
}) {
  const [selectedSubject, setSelectedSubject] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, [grade]);

  const saveNewGivenSubject = async () => {
    const body = {
      day: day,
      startTime: startTime,
      endTime: endTime,
      subject: selectedSubject._id,
      class: selectedClass,
    };
    const res = await fetch("/api/givenSubject", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const result = await res.json();
    if (result?.isAdded) {
      handleOpen("Ders Eklendi.");
      getGivenSubjects();
    } else {
      handleOpen(result.message);
    }
    clearSelectedCheckboxes();
  };

  const fetchSubjects = async () => {
    const resSubjects = await fetch("http://localhost:3000/api/subject", {
      cache: "no-cache",
    });
    const subjects = await resSubjects.json();
    if (grade !== 0) {
      setSubjects(subjects.filter((subject) => subject.grade === grade));
    } else {
      setSubjects(subjects);
    }
  };
  const fetchClasses = async () => {
    const resClasses = await fetch("http://localhost:3000/api/class", {
      cache: "no-cache",
    });
    const classes = await resClasses.json();
    setClasses(classes);
  };
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Grade:{grade}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Day:{ Days[day]}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            StartTime-EndTime:{Times[startTime]}-{Times[endTime]}
          </Typography>
          <Select
            labelId="select-subject"
            id="select-subject"
            value={selectedSubject._id}
            label="Subject"
            className="w-full"
            onChange={(e) =>
              setSelectedSubject(
                subjects.find((item) => item._id === e.target.value)
              )
            }
          >
            {subjects.map((subject) => (
              <MenuItem
                className="w-1/2"
                key={subject._id}
                value={subject._id}
                disablePadding
              >
                {subject.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            labelId="select-class"
            id="select-class"
            value={selectedClass._id}
            label="Class"
            placeholder="Select Class"
            className="w-full mt-2"
            onChange={(e) =>
              setSelectedClass(
                classes.find((item) => item._id === e.target.value)
              )
            }
          >
            {classes.map((_class) => (
              <MenuItem
                className="w-1/2"
                key={_class._id}
                value={_class._id}
                disablePadding
              >
                {_class.code}
              </MenuItem>
            ))}
          </Select>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={saveNewGivenSubject}>
          Save
        </Button>
      </CardActions>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </Card>
  );
}
