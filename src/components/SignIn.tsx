import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../utils/auth/authContext';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string>('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChangeLogin = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, [prop]: event.target.value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await signIn(loginValue.username, loginValue.password);
    } catch (e) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={loginValue.username}
            onChange={handleChangeLogin('username')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginValue.password}
            onChange={handleChangeLogin('password')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={loginValue.rememberMe}
                onChange={() => setLoginValue({ ...loginValue, rememberMe: !loginValue.rememberMe })}
                color="primary"
              />
            }
            label="Remember me"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;