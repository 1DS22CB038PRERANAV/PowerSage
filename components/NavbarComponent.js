import Image from "next/image";
import Link from "next/link";
import { withRouter } from "next/router";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand='md' className="navbar bg-dark">
      <Container>
        <Link href="/" className="text-decoration-none" passHref>
          <Navbar.Brand
            as="span"
            className="navbar-brand text-white text-decoration-none"
          >
            <Image
              alt=""
              src="/PowerSageLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            &nbsp; Power Sage
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white p-1" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Link href="/about" className="text-decoration-none" passHref>
              <Nav.Link as="span" className="text-white text-decoration-none">
                About
              </Nav.Link>
            </Link>
            <Link href="/calculate" className="text-decoration-none" passHref>
              <Nav.Link as="span" className="text-white text-decoration-none">
                Calculate
              </Nav.Link>
            </Link>
            <Link href="/graphs" className="text-decoration-none" passHref>
              <Nav.Link as="span" className="text-white text-decoration-none">
                Graphs
              </Nav.Link>
            </Link>
          </Nav>
          <Navbar.Text className="text-white">
            User : Prerana V
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);
