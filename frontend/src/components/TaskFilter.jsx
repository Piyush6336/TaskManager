import { Button, ButtonGroup, Box } from "@mui/material";

const TaskFilter = ({ currentFilter, onChange }) => {
  const filters = ["all", "active", "completed"];

  return (
    <Box mb={3}>
      <ButtonGroup variant="outlined" color="primary">
        {filters.map((f) => (
          <Button
            key={f}
            variant={currentFilter === f ? "contained" : "outlined"}
            onClick={() => onChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default TaskFilter;
