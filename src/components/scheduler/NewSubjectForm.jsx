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
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function MultiActionAreaCard({
  grade,
  day,
  startTime,
  endTime,
}) {
  const [selectedSubject, setSelectedSubject] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const saveNewGivenSubject = async () => {
    const body = {
      grade: grade,
      day: day,
      startTime: startTime,
      endTime: endTime,
      subject: selectedSubject._id,
    };
    const res = await fetch("/api/givenSubject", {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(await res.json());
  };

  const fetchSubjects = async () => {
    const resSubjects = await fetch("http://localhost:3000/api/subject", {
      cache: "no-cache",
    });
    const subjects = await resSubjects.json();
    setSubjects(subjects);
  };
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Grade:{grade}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Day:{day}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            StartTime-EndTime:{startTime}-{endTime}
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={saveNewGivenSubject}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
