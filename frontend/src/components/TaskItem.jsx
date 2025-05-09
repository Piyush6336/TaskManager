import { Box, Typography, Button, Paper } from "@mui/material";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            textDecoration: task.status ? "line-through" : "none",
            color: task.status ? "text.disabled" : "text.primary",
          }}
        >
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Priority: {task.priority}
        </Typography>
      </Box>

      <Box display="flex" gap={1}>
        <Button color="success" onClick={() => onToggle(task._id, task.status)}>
          {task.status ? "Undo" : "Done"}
        </Button>
        <Button color="error" onClick={() => onDelete(task._id)}>
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskItem;
