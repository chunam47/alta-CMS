import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';

import { routerForgotPassword } from '../view/Auth/ForgotPassword/router';
import { routerResetPassword } from '../view/Auth/ResetPassword/router';
import { routerHomepage } from '../view/Homepage/router';

import { IRouter } from './interface';

export const privatePage: IRouter[] = [routerHomepage, routerViewProfile];

export const publicPage: IRouter[] = [routerLogin, routerForgotPassword, routerResetPassword];
