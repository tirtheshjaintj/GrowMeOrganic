import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/loginSlice';
import { TextField, Button, Container, Typography,Box} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    phoneNumber: string; // changed to string to handle the regex validation properly
}

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^[0-9]{10}$/;

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', phoneNumber: '' });
    const [errors, setErrors] = useState<FormData>({ name: '', email: '', phoneNumber: '' });
    const dispatch = useDispatch();
    const user=useSelector((state:any)=>state.user);
    const navigate=useNavigate();

    const handleLogin = (e:any) => {
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
        setFormData({ ...formData, [name]: value});
        validateField(name, value.trim());
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'name' && !nameRegex.test(value.trim()) && value.toString().trim().length<3) {
            error = 'Name should contain only letters and spaces';
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
    if(user.name && user.email && user.phoneNumber!="0"){
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
                    minWidth:'100vw',
                    background:"#141c3a",
                }}
            >
                   <Box 
                   height='auto' 
                   width={{md:"50vw",xs:"80vw"}}
                   margin="10px"
                   display="flex" 
                   flexDirection='column' 
                   >
                    
                    <Typography variant="h1" display="flex" justifyContent="start" alignItems="center" fontSize="30px" fontWeight="bold" color="white" gutterBottom>
                        Login <LockOpenIcon/>
                    </Typography>
                    <form onSubmit={handleLogin}>
                    <TextField
                        label="Name"
                        name="name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        InputProps={{
                            style: { color: 'white', borderBottom: '1px solid white' },
                            className: 'white-input', // Custom class for white text color
                            autoComplete: 'off', // Turn off autocomplete suggestions
                        }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        InputProps={{
                            style: { color: 'white', borderBottom: '1px solid white' },
                            className: 'white-input', // Custom class for white text color
                            autoComplete: 'off', // Turn off autocomplete suggestions
                        }}
                    />
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                      InputProps={{
                            style: { color: 'white', borderBottom: '1px solid white' },
                            className: 'white-input', // Custom class for white text color
                            autoComplete: 'off', // Turn off autocomplete suggestions
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleLogin}
                        sx={{ mt: 2 }}
                    >
                        Login<LoginIcon/>
                    </Button>
                    </form>
                </Box>
            </Container>
    );
};

export default Login;
