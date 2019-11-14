import React, { useState } from "react";
import { render } from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./client.module.css";
import axios from "axios";
import { Drone } from "./Drone/Drone";

const App = () => {
  const [directions, setDirections] = useState(null);
  const formik = useFormik({
    initialValues: {
      directions: ""
    },
    validationSchema: Yup.object({
      directions: Yup.string()
        .matches(/^[<>^vx]+$/, {
          message: "Please enter valid directions."
        })
        .required("Required")
    }),
    onSubmit: async ({ directions }) => {
      try {
        const response = await axios.post("http://localhost:4001", {
          directions: directions
        });
        setDirections(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  });

  return (
    <div className={classes.container}>
      <h1>Drone Photography</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Enter the valid directions"
          {...formik.getFieldProps("directions")}
        />
        {formik.touched.directions && formik.errors.directions ? (
          <div className={classes.error}>{formik.errors.directions}</div>
        ) : null}
        <button className={classes.btn} type="submit">
          Take a photo
        </button>
      </form>
      <div className={classes.drone}>
        <Drone
          title="Single Drone"
          quantity="1"
          score={directions !== null ? directions.singleDrone : null}
        />
        <Drone
          title="Double Drone"
          quantity="2"
          score={directions !== null ? directions.doubleDrone : null}
        />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
