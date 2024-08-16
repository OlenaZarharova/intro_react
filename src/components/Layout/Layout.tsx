import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GiGemNecklace } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import classes from "./Layout.module.css";

export default function Layout() {
  const [theme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""
  );

  return (
    <div data-theme={theme} className={classes.page_container}>
      <Navbar expand="lg" variant="dark" className={classes.navbar}>
        <Container fluid>
          <Link to="/">
            <img
              src="src/assets/logo.svg"
              width="30"
              height="30"
              alt="Kidimer shop"
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={classes.nav_item_container + " me-auto"}>
              <NavLink to="/home">
                <GoHome />
                Home
              </NavLink>
              <NavLink to="/products">
                <GiGemNecklace />
                Products
              </NavLink>
            </Nav>
            <Nav className={classes.nav_item_container}>
              <NavLink to="/settings">
                <CiSettings />
                Settings
              </NavLink>
              <NavLink to="/card">
                <SlBasket />
                Card
              </NavLink>
              <NavLink to="/account/login">
                <IoIosLogOut />
                Logout
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Outlet />
      </Container>
    </div>
  );
}
