import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { useAuth } from "../context/authContext/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verifiedEmail, setVeifiedEmail] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/register")}
            sx={{ textDecoration: "none" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
