import React from "react";
import classes from "./drone.module.css";
import droneIcon from "../images/drone.png";
import { FaImages, FaImage } from "react-icons/fa";

export const Drone = ({ title, quantity, score }) => {
  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <div className={classes.icons}>
        {quantity === "2" ? (
          <>
            <img src={droneIcon} alt="drone" />
            <img src={droneIcon} alt="drone" />
          </>
        ) : (
          <img src={droneIcon} alt="drone" />
        )}
      </div>
      {score ? (
        <div className={classes.score}>
          {score > 1 ? (
            <FaImages className={classes.icon} />
          ) : (
            <FaImage className={classes.icon} />
          )}
          {score}
        </div>
      ) : null}
    </div>
  );
};
