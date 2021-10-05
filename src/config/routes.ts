import IRoute from '../interfaces/route'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import LoginPage from '../pages/auth/LoginPage'
import LogoutPage from '../pages/auth/LogoutPage'
import RegisterPage from '../pages/auth/RegisterPage'
import Calendar from '../components/Calendar/Calendar'

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Calendar,
        name: 'Home Page',
        protected: true,
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register Page',
        protected: false,
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false,
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout Page',
        protected: true,
    },
    {
        path: '/forget',
        exact: true,
        component: ForgotPasswordPage,
        name: 'Forgot Password Page',
        protected: false,
    },
]

export default routes
