import { Box, Button, Typography } from "@mui/material";
import useAuth from "../contexts/useAuth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <Typography variant="h5" fontWeight="bold">
        Your Tasks
      </Typography>
      <Button variant="contained" color="error" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default Header;
