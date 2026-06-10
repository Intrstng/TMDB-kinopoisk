import {type MouseEvent, useState} from "react";
import {type SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {loginPageFormSchema} from "@/common/pages/LoginPage/model/LoginPage.schemas.ts";
import {PATH} from "@/common/enums";
import type {LoginPageFormArgs} from "@/common/pages/LoginPage/types.ts";
import {setIsLoggedInAC} from "@/app/model/slices/app-slice.ts";
import {useAppDispatch} from "@/common/hooks";
import {signInUser} from "@/app/config/auth.ts";
import {errorNotifyMessage} from "@/common/utils/notifyMessage.ts";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {LoginSx} from "@/common/pages/LoginPage/LoginPage.styles.ts";
import {useNavigate} from "react-router-dom";
import {SignInWithGoogle} from "@/common/components/SignInWithGoogle/SignInWithGoogle.tsx";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onClickShowPassword = () => setShowPassword((show) => !show);
    const onMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<LoginPageFormArgs>({
        // mode: 'onChange',
        mode: 'all',
        resolver: zodResolver(loginPageFormSchema),
    });

    const onSubmit: SubmitHandler<LoginPageFormArgs> = async (data) => {
        try {
            await signInUser(data.email, data.password);
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
            reset();
            navigate(PATH.MAIN);
        } catch (err) {
            if (err instanceof Error) {
                errorNotifyMessage({message: err.message});
            }
        }
    };

    /**
     *  В RHF formState обёрнут в Proxy и подписывает компонент только на те свойства, которые были прочитаны во время рендера.
     *  поэтому в LoginPage в отличие от SignUpPage идет не прямое обращение к errors?.email в TextField и Typography, а через
     *  переменную emailError (временное решение)
     */
    const emailError = errors?.email;

    return (
        <Container component='main' maxWidth='xs'>
            <Box sx={LoginSx.content}>
                <Avatar sx={LoginSx.logo}>
                    <ExitToAppIcon />
                </Avatar>
                <Typography component='h2' variant='h5' sx={LoginSx.title}>
                    {'Log In'}
                </Typography>
                <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup>
                        <FormControl fullWidth>
                            <TextField
                                label={"Email"}
                                type='email'
                                margin='normal'
                                fullWidth
                                id='emailLogin'
                                error={!!emailError}
                                variant='outlined'
                                sx={LoginSx.emailInput}
                                {...register('email')}
                                autoComplete='email'
                                size='small'
                            />
                            {emailError && (
                                <Typography
                                    component='h2'
                                    variant='body2'
                                    sx={{ ...LoginSx.errorForm, ...LoginSx.errorMail }}
                                >
                                    {errors?.email?.message}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl variant='outlined' size='small' error={!!errors?.password}>
                            <InputLabel htmlFor='password'>{'Password'}</InputLabel>
                            <OutlinedInput
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                autoComplete='current-password'
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
                            {!isValid && errors?.password && (
                                <Typography
                                    component='h2'
                                    variant='body2'
                                    sx={{ ...LoginSx.errorForm, ...LoginSx.errorPass }}
                                >
                                    {errors.password.message}
                                </Typography>
                            )}
                        </FormControl>
                        <Button
                            sx={LoginSx.button}
                            type='submit'
                            variant='outlined'
                            fullWidth
                            disabled={!isValid}
                        >
                            Log In
                        </Button>
                    </FormGroup>
                    <Grid container>
                        <Grid size={{ xs: 12 }} sx={LoginSx.link}>
                            <Link href={PATH.SIGNUP} variant='subtitle2' underline='hover' color='text.secondary'>
                                {'If you don\'t have an account yet, please '}
                                <Typography component="span" sx={LoginSx.linkClue}>
                                    register
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <SignInWithGoogle />
        </Container>
    );
};