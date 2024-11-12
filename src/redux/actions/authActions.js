// // src/redux/actions/authActions.js
// import axios from "axios";
// import {
//   signupStart,
//   signupSuccess,
//   signupFailure,
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   adminListStart,
//   adminListSuccess,
//   adminListFailure,
// } from "../reducers/auth";

// export const signup = (userData) => {
//   return async (dispatch) => {
//     dispatch(signupStart());

//     try {
//       const response = await axios.post(
//         "http://localhost:8081/auth/admin/signup",
//         userData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       dispatch(signupSuccess(response.data.data));
//     } catch (error) {
//       dispatch(signupFailure(error.response.data.message));
//     }
//   };
// };

// export const login = (userData) => {
//   return async (dispatch) => {
//     dispatch(loginStart());

//     try {
//       const response = await axios.post(
//         "http://localhost:8081/auth/admin/login",
//         userData
//       );
//       console.log(response);
//       // Assuming response.data is an object with user and token properties
//       const { data } = response.data;
//       console.log("----------------token---------", data);
//       dispatch(loginSuccess({ token: data }));
//     } catch (error) {
//       dispatch(loginFailure(error.response.data.message));
//     }
//   };
// };

// export const adminList = () => {
//   return async (dispatch) => {
//     dispatch(adminListStart());

//     try {
//       const response = await axios.get("http://localhost:8081/auth/admin/get");
//       const { data } = response.data;
//       console.log(data);
//       dispatch(adminListSuccess(data));
//     } catch (error) {
//       dispatch(adminListFailure(error.response.data.message));
//     }
//   };
// };
