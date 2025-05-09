import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { fetchTasks, addTask, updateTask, deleteTask } from "../services/api";
import useAuth from "../contexts/useAuth";

const DashboardPage = () => {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "Medium" });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await fetchTasks(token);
    if (Array.isArray(res)) setTasks(res);
  };

  const handleAddTask = async () => {
    if (!newTask.title) return alert("Title required");
    const res = await addTask(token, newTask);
    if (res._id) {
      setTasks([...tasks, res]);
      setNewTask({ title: "", description: "", priority: "Medium" });
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(token, id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleToggle = async (id, currentStatus) => {
    const res = await updateTask(token, id, { status: !currentStatus });
    if (res._id) {
      setTasks(tasks.map(t => t._id === id ? { ...t, status: res.status } : t));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return filter === "completed" ? task.status : !task.status;
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Your Tasks</Typography>
        <Button variant="contained" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Title"
          variant="outlined"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          fullWidth
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          fullWidth
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newTask.priority}
            label="Priority"
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddTask}>
          Add
        </Button>
      </Box>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
      </ToggleButtonGroup>

      <Box>
        {filteredTasks.map(task => (
          <Paper key={task._id} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="subtitle1" sx={{ textDecoration: task.status ? "line-through" : "none" }}>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">{task.description}</Typography>
              <Typography variant="caption" color="text.secondary">Priority: {task.priority}</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Button color="success" onClick={() => handleToggle(task._id, task.status)}>
                {task.status ? "Undo" : "Done"}
              </Button>
              <Button color="error" onClick={() => handleDelete(task._id)}>
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default DashboardPage;
