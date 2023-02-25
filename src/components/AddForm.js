import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";

console.log(Country.getAllCountries());
console.log(State.getAllStates());
const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const TYPE = location?.state?.type;
  console.log(TYPE);
  const registerHandler = (data) => {
    axios
      .post(`https://fakestoreapi.com/users`, {
        hospital: data?.hospital,
        name: data?.name,
        email: data?.email,
        bloodgroup: data?.bloodgroup,
        city: data?.city,
        state: data?.state,
      })
      .then(navigate(`/${TYPE}`));
  };
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Successfully added", "");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };
  let navigate = useNavigate();
  return (
    <div style={{ marginLeft: "300px", marginTop: "100px" }}>
      <h1>BloodBank</h1>
      <hr />
      <form
        onSubmit={handleSubmit(registerHandler)}
        style={{ height: "100%", marginTop: "30px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "65px",
          }}
        >
          {TYPE == "hospital" ? (
            <>
              <label>Hospital Name</label>
              <TextField
                variant="outlined"
                label="Hospital Name"
                type="text"
                name="hospital"
                {...register("hospital")}
              />
            </>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "130px",
          }}
        >
          {TYPE == "blood" || TYPE == "user" ? (
            <>
              <label>Name</label>
              <TextField
                variant="outlined"
                label="Name"
                type="text"
                name="name"
                {...register("name")}
              />
            </>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "133px",
            marginTop: "15px",
          }}
        >
          {TYPE == "user" ? (
            <>
              <label>Email</label>
              <TextField
                variant="outlined"
                label="Email"
                type="text"
                name="email"
                {...register("email")}
              />
            </>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            gap: "82px",
          }}
        >
          {TYPE == "blood" ? (
            <>
              <label>Blood Group</label>
              <TextField
                variant="outlined"
                label="Blood"
                type="text"
                name="bloodgroup"
                {...register("bloodgroup")}
              />
            </>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
            gap: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "145px",
            }}
          >
            {TYPE == "state" ? null : (
              <>
                <label>City</label>
                <TextField
                  variant="outlined"
                  label="City"
                  type="text"
                  name="city"
                  {...register("city")}
                />
                {/* <select>
                  {State.getStatesOfCountry("IN").map((i) => (
                    <option value="city">{i.name}</option>
                  ))}
                </select> */}
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "135px",
            }}
          >
            <label>State</label>
            {
              TYPE == "city" ||
              TYPE == "state" ||
              TYPE == "hospital" ||
              TYPE == "blood" ||
              TYPE == "user" ? (
                <TextField
                  variant="outlined"
                  label="State"
                  type="text"
                  name="state"
                  {...register("state")}
                />
              ) : null

              // <select>
              //   {City.getCitiesOfState("IN", "MH").map((i) => (
              //     <option value="city">{i.name}</option>
              //   ))}
              // </select>
            }
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginTop: "30px",
            height: "45px",
            width: "110px",
            padding: "10px",
            borderRadius: "10px",
          }}
          onClick={createNotification("success")}
        >
          Save
        </button>
        <button
          style={{
            marginTop: "30px",
            height: "45px",
            width: "110px",
            padding: "10px",
            borderRadius: "10px",
            marginLeft: "20px",
          }}
          onClick={() => {
            TYPE == "user" ? (
              navigate("/user")
            ) : TYPE == "state" ? (
              navigate("/state")
            ) : TYPE == "blood" ? (
              navigate("/blood")
            ) : TYPE == "hospital" ? (
              navigate("/hospital")
            ) : TYPE == "city" ? (
              navigate("/city")
            ) : (
              <div></div>
            );
          }}
        >
          Back
        </button>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default AddForm;
