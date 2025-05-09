import { useState } from "react";
import { TextField, Select, MenuItem, Button, Box, FormControl, InputLabel } from "@mui/material";

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({ title: "", description: "", priority: "Medium" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return alert("Title is required");
    onAdd(task);
    setTask({ title: "", description: "", priority: "Medium" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mb={3}>
      <TextField
        label="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        fullWidth
      />
      <TextField
        label="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          value={task.priority}
          label="Priority"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TaskForm;
