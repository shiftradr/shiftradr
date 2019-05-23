import React from "react";
import axios from "axios";
import swal from "sweetalert";
import "./Login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom'


const Registration = (props) => {
  async function handleRegister(values) {
    var res = await axios.post("/auth/register", {
          values
      });
  if (res.data.loggedIn) props.history.push("/dashboard")
     else {
      console.error("Form Invalid - Display Error Message");
      swal(res.data.message)
    }
  };
  
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        employeeId: "",
        groupId: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
            handleRegister(values)
          console.log("Logging in", values);
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("Required Field"),
        lastName: Yup.string().required("Required Field"),
        email: Yup.string()
          .email()
          .required("Required Field"),
        password: Yup.string()
          .required("No password provided.")
          .min(6, "Minimum password length 6 characters.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
        employeeId: Yup.string()
          .min(5, "Employee ID must be 5 numbers.")
          .required("Required Field"),
        groupId: Yup.string().required("Required Field")
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
            <div className="wrapper">
              <div className="form-wrapper">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="firstName">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="reg-inputs"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.firstName && touched.firstName && "error"}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="input-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="lastName">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="reg-inputs"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.lastName && touched.lastName && "error"}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="input-feedback">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                      id="reg-inputs"
                      name="email"
                      type="text"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                      id="reg-inputs"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </div>
    
                  <div className="employeeId">
                    <label className="label" htmlFor="employeeId">
                      Employee ID
                    </label>
                    <input
                      id="reg-inputs"
                      name="employeeId"
                      type="text"
                      placeholder="Employee ID"
                      value={values.employeeId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.employeeId && touched.employeeId && "error"}
                    />
                    {errors.employeeId && touched.employeeId && (
                      <div className="input-feedback">{errors.employeeId}</div>
                    )}
                  </div>
    
                  <div className="groups">
                    <label htmlFor="groupId">Department</label>
                    <select
                      name="groupId"
                      className="groupId"
                      value={values.groupId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.groupId && touched.groupId && "error"}
                    >
                      <option defaultValue>Select Group</option>
                      <option value="1">Crew</option>
                      <option value="2">Customer</option>
                      <option value="3">MCCM</option>
                      <option value="4">Reservations</option>
                      <option value="5">True</option>
                      <option value="6">Vacations</option>
                    </select>
                    {errors.groupId && touched.groupId && (
                      <div className="input-feedback">{errors.groupId}</div>
                    )}
                  </div>
                  <div className="createAccount">
                    <button
                      className="regButton"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Create Account
                    </button>
                    <Link style={{ textDecoration: 'none', color: '#417FFC' }} to='/'>
                      Already Have an Account?
                    </Link>
                  </div>
                </form>
              </div>
              </div>
            </div>
          ) 
        }}
      </Formik>
    
  )};

export default Registration