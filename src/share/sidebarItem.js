import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ icon, link, title }) {
  return (
    <>
      <li>
        <Link to={link} className="waves-effect">
          <i className={icon}></i>
          <span>{title}</span>
        </Link>
      </li>
    </>
  );
}

export default SidebarItem;
