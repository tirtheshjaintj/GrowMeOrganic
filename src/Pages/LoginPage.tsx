import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/loginSlice';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    phoneNumber: string;
}

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^[0-9]{10}$/;

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', phoneNumber: '' });
    const [errors, setErrors] = useState<FormData>({ name: '', email: '', phoneNumber: '' });
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const handleLogin = (e: any) => {
        e.preventDefault();
        const userData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phoneNumber: Number(formData.phoneNumber.trim()),
        };
        if (validateForm()) {
            console.log(userData);
            dispatch(setUser(userData));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value.trim());
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'name' && (!nameRegex.test(value.trim()) || value.toString().trim().length < 3)) {
            error = 'Name should contain only letters and spaces and be at least 3 characters long';
        }
        if (name === 'email' && !emailRegex.test(value.trim())) {
            error = 'Invalid email format';
        }
        if (name === 'phoneNumber' && !phoneNumberRegex.test(value.trim())) {
            error = 'Phone number should be 10 digits';
        }
        setErrors({ ...errors, [name]: error });
    };

    const validateForm = () => {
        const nameError = !nameRegex.test(formData.name.trim()) ? 'Name should contain only letters and spaces' : '';
        const emailError = !emailRegex.test(formData.email.trim()) ? 'Invalid email format' : '';
        const phoneNumberError = !phoneNumberRegex.test(formData.phoneNumber.trim()) ? 'Phone number should be 10 digits' : '';
        setErrors({ name: nameError, email: emailError, phoneNumber: phoneNumberError });

        return !nameError && !emailError && !phoneNumberError;
    };

    useEffect(() => {
        if (user.name && user.email && user.phoneNumber !== "0") {
            navigate("/");
        }
    }, [user]);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                minWidth: '100vw',
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, width: { md: "50vw", xs: "80vw" }, backgroundColor: "#1e2749" }}>
                <Typography variant="h4" align="center" color="white" gutterBottom>
                    Login <LockOpenIcon fontSize="large" />
                </Typography>
                <form onSubmit={handleLogin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                InputLabelProps={{ style: { color: 'white' } }}
                      
                                InputProps={{
                                    style: { color: 'white' , borderBottom: '1px solid white'},
                                    className: 'white-input',
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    style: { color: 'white' ,borderBottom: '1px solid white'},
                                    className: 'white-input',
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                variant="outlined"
                                type="tel"
                                fullWidth
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber}
                                InputLabelProps={{ style: { color: 'white' ,} }}
                                InputProps={{
                                    style: { color: 'white' ,borderBottom: '1px solid white'},
                                    className: 'white-input',
                                    autoComplete: 'off',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Login <LoginIcon />
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
