import React, {useEffect, useRef, useState} from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpPageFormSchema} from "@/common/pages/SignUpPage/model/SignUpPage.schemas.ts";
import {PATH} from "@/common/enums";
import type {SignUpPageFormArgs} from "@/common/pages/SignUpPage/types.ts";
import {useAppDispatch} from "@/common/hooks";
import {setIsLoggedInAC} from "@/app/model/slices/app-slice.ts";
import {signUpUser} from "@/app/config/auth.ts";
import {PasswordStrength} from "@/common/components";
import {errorNotifyMessage} from "@/common/utils/notifyMessage.ts";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {SignupSx} from "@/common/pages/SignUpPage/SignUpPage.styles.ts";
import {LoginSx} from "@/common/pages/LoginPage/LoginPage.styles.ts";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";

export const SignUpPage = () => {
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (passwordInputRef.current) {
            setPassword(passwordInputRef.current!.value);
        }
    }, [passwordInputRef.current?.value]);

    const onClickShowPassword = () => setShowPassword((show) => !show);
    const onMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const onClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const onMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<SignUpPageFormArgs>({
        mode: 'all',
        resolver: zodResolver(signUpPageFormSchema),
    });

    const onSubmit: SubmitHandler<SignUpPageFormArgs> = async (data) => {
        try {
            await signUpUser(data.name, data.email, data.password);
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
            reset();
            navigate(PATH.MAIN);
        } catch (err) {
            if (err instanceof Error) {
                errorNotifyMessage({message: err.message});
            }
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box sx={SignupSx.content}>
                <Avatar sx={SignupSx.logo} variant='rounded'>
                    <HowToRegIcon />
                </Avatar>
                <Typography component='h2' variant='h5' sx={LoginSx.title}>
                    {'Sign up'}
                </Typography>
                <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup>
                        <FormControl fullWidth>
                            <TextField
                                label={'Name'}
                                type='text'
                                margin='normal'
                                fullWidth
                                id='name'
                                error={!!errors?.name}
                                variant='outlined'
                                sx={SignupSx.name}
                                {...register('name')}
                                autoComplete='name'
                                size='small'
                            />
                            {errors?.name && (
                                <Typography
                                    component='h2'
                                    variant='body2'
                                    sx={{ ...SignupSx.errorForm, ...SignupSx.errorName }}
                                >
                                    {errors.name.message}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label={'Email'}
                                type='email'
                                margin='normal'
                                fullWidth
                                id='emailSignUp'
                                error={!!errors?.email}
                                variant='outlined'
                                sx={SignupSx.emailInput}
                                {...register('email')}
                                autoComplete='email'
                                size='small'
                            />
                            {errors?.email && (
                                <Typography
                                    component='h2'
                                    variant='body2'
                                    sx={{ ...SignupSx.errorForm, ...SignupSx.errorMail }}
                                >
                                    {errors.email.message}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl
                            sx={SignupSx.passInput}
                            variant='outlined'
                            size='small'
                            error={!!errors?.password}
                        >
                            <InputLabel htmlFor='passwordSignUp'>Password</InputLabel>
                            <OutlinedInput
                                id='passwordSignUp'
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                autoComplete='current-password'
                                inputRef={passwordInputRef}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={onClickShowPassword}
                                            onMouseDown={onMouseDownPassword}
                                            edge='end'
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={'Password'}
                            />
                            {errors?.password && (
                                <Typography
                                    component='h2'
                                    variant='body2'
                                    sx={{ ...SignupSx.errorForm, ...SignupSx.errorPass }}
                                >
                                    {errors.password.message}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl
                            sx={SignupSx.confirmPassInput}
                            variant='outlined'
                            size='small'
                            error={!!errors?.confirmPassword}
                        >
                            <InputLabel htmlFor='confirmPassword'>{'Confirm password'}</InputLabel>
                            <OutlinedInput
                                id='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                autoComplete='current-password'
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle confirmPassword visibility'
                                            onClick={onClickShowConfirmPassword}
                                            onMouseDown={onMouseDownConfirmPassword}
                                            edge='end'
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={'Confirm password'}
                            />
                            {errors?.confirmPassword && (
                                <Typography
                                    component='h2'
                                    variant='body2'
                                    sx={{ ...SignupSx.errorForm, ...SignupSx.errorConfirmPass }}
                                >
                                    {errors.confirmPassword.message}
                                </Typography>
                            )}
                        </FormControl>

                        <PasswordStrength password={password} />

                        <Button
                            sx={SignupSx.button}
                            type='submit'
                            variant='outlined'
                            fullWidth
                            disabled={!isValid}
                        >
                            {'Sign up'}
                        </Button>
                    </FormGroup>
                    <Grid container>
                        <Grid size={12} sx={SignupSx.link}>
                            <Link href={PATH.LOGIN} variant='subtitle2' underline='hover' color='text.secondary'>
                                {'If you already have an account, please '}
                                <Typography component="span" sx={SignupSx.linkClue}>
                                sign in
                            </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
