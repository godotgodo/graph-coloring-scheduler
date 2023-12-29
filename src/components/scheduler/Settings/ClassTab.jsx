import { Delete } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

function ClassTab() {
  const [classes, setClasses] = useState([]);
  const [newClassCode, setNewClassCode] = useState();

  useEffect(() => {
    fetchClasses();
  }, []);
  const fetchClasses = async () => {
    const resClasses = await fetch("http://localhost:3000/api/class");
    setClasses(await resClasses.json());
  };
  const saveNewClass = async () => {
    const body = {
      code: newClassCode,
    };
    const resNewClass = await fetch("http://localhost:3000/api/class", {
      method: "POST",
      body: JSON.stringify(body),
    });
    fetchClasses();
  };
  const deleteClass = async (id) => {
    const body = {
      id: id,
    };
    const resDeleteClass = await fetch("http://localhost:3000/api/class", {
      method: "DELETE",
      body: JSON.stringify(body),
    });
    fetchClasses();
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <TextField
          helperText="Please enter class code"
          id="demo-helper-text-misaligned"
          label="Class Code"
          onChange={(e) => setNewClassCode(e.target.value)}
        />
        <Button variant="outlined" onClick={saveNewClass}>
          Save
        </Button>
      </div>
      <div>
        <List className="w-1/2">
          {classes.map((item) => (
            <ListItem key={item._id} disablePadding>
              <ListItemText primary={item.code} />
              <ListItemIcon
                className="cursor-pointer"
                onClick={() => deleteClass(item._id)}
              >
                <Delete />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}

export default ClassTab;
