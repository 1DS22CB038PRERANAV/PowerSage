import React from "react";
import { Image } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-4">
      <div className="container d-flex justify-content-between">
        <div className="footer-left">
          <Image
            alt=""
            src="/PowerSageLogo.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          &nbsp;
          <h4 className="mb-0"> Power Sage</h4>
        </div>
        <div className="footer-right">
          <h4 className="mb-2">
            Dayananda Sagar College of Engineering, Bengaluru
          </h4>
          <h5 className="mb-0 mt-4">Team Members:</h5>
          <ul className="mb-0">
            <li>Prerana V</li>
            <li>Priyanshu Kumar Sinha</li>
            <li>Priyanshu Pratik</li>
            <li>Prasidh Krishna</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
