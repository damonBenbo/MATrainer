import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Remove the useHistory import

const ToolbarComponent = ({ userLoggedIn, username }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#e63946' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MATrainer
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {userLoggedIn ? (
          <>
            <Link to={`/user/${username}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Welcome, {username}
              </Typography>
            </Link>
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;