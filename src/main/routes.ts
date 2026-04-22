import express from 'express';
import { authenticate } from './middleware/Authentication';
import AuthRoute from './api/credentials/auth/Api';

//users
// import UsersRoute from './api/credentials/users/Api';
import RoleRoute from './api/master/roles/Api';
import MenuRoute from './api/master/menus/Apis';
import UsersAssigmentRoute from './api/credentials/users_assigment/Api';
import UsersRoute from './api/credentials/users/Api';

//master
import EmployeeRoute from './api/master/employee/Api';
import codebookRoute from './api/master/codebook/Api';
import codebookDetailRoute from './api/master/codebook_detail/Api';

//APPROVAL



//TRANSACTION



//DASHBOARD


//REPORT

const protectedRoute = express.Router();
const unprotectedRoute = express.Router();

// Unprotected Route
unprotectedRoute.use(AuthRoute);


// Protected Route
protectedRoute.use(authenticate);
protectedRoute.use(UsersRoute);
protectedRoute.use(RoleRoute);
protectedRoute.use(UsersAssigmentRoute);


//master
protectedRoute.use(MenuRoute);
protectedRoute.use(EmployeeRoute);
protectedRoute.use(codebookRoute);
protectedRoute.use(codebookDetailRoute);




//DASHBOARD


//REPORT


//transaction



//APPROVAL


// Do not change the sequence
// in order to make unprotected route keep unprotected
export default [unprotectedRoute, protectedRoute];
