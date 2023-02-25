import "./App.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapIcon from "@mui/icons-material/Map";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hospital from "./components/Hospital";
import State from "./components/State";
import City from "./components/City";
import AddForm from "./components/AddForm";
import Blood from "./components/Blood";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import User from "./components/User";
import PersonIcon from "@mui/icons-material/Person";
import UpdateForm from "./components/UpdateForm";
const drawerWidth = 240;

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  let navigate = useNavigate();
  return (
    <>
      {token ? (
        <div>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "#a2b9bc",
              }}
            >
              <Toolbar>
                <div
                  style={{
                    display: "flex",
                    gap: "1100px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    Blood Bank
                  </Typography>
                  {/* <Avatar alt="Remy Sharp" src="./components/1.jpg" /> */}
                  {token ? (
                    <button
                      style={{
                        width: "100px",
                        height: "35px",
                        marginBottom: "20px",
                        marginTop: "20px",
                      }}
                      onClick={() => {
                        setToken("");
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      Log out
                    </button>
                  ) : null}
                </div>
              </Toolbar>
            </AppBar>

            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box
                sx={{
                  overflow: "auto",
                  backgroundColor: "teal",
                  height: "100%",
                }}
              >
                <List sx={{ padding: 2 }}>
                  <ListItem disablePadding sx={{ margin: 2, gap: 2 }}>
                    <ApartmentIcon sx={{ color: "white" }} />
                    <Link to="/City" className="link">
                      City
                    </Link>
                  </ListItem>
                  <ListItem disablePadding sx={{ margin: 2, gap: 2 }}>
                    <MapIcon sx={{ color: "white" }} />
                    <Link to="/State" className="link">
                      State
                    </Link>
                  </ListItem>
                  <ListItem disablePadding sx={{ margin: 2, gap: 2 }}>
                    <LocalHospitalIcon sx={{ color: "white" }} />

                    <Link to="/Hospital" className="link">
                      Hospital
                    </Link>
                  </ListItem>
                  <ListItem disablePadding sx={{ margin: 2, gap: 2 }}>
                    <BloodtypeIcon sx={{ color: "white" }} />

                    <Link to="/blood" className="link">
                      Blood
                    </Link>
                  </ListItem>
                  <ListItem disablePadding sx={{ margin: 2, gap: 2 }}>
                    <PersonIcon sx={{ color: "white" }} />
                    <Link to="/user" className="link">
                      User
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>
        </div>
      ) : null}
      <Routes>
        <Route path="/" element={<Login token={token} setToken={setToken} />} />
        {token ? <Route path="/state" element={<State />} /> : null}
        {token ? <Route path="/city" element={<City />} /> : null}
        {token ? <Route path="/hospital" element={<Hospital />} /> : null}
        {token ? <Route path="/add" element={<AddForm />} /> : null}
        {token ? <Route path="/blood" element={<Blood />} /> : null}
        {token ? <Route path="/user" element={<User />} /> : null}
        {token ? <Route path="/update" element={<UpdateForm />} /> : null}
      </Routes>
    </>
  );
}

export default App;
