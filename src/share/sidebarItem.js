import React from "react"
import { Link } from "react-router-dom"

function SidebarItem({ props, icon, link, title }) {
  return (
    <>
      <li>
        <Link to={link} className="waves-effect">
          <i className={icon}></i>
          <span>{props.t(title)}</span>
        </Link>
      </li>
    </>
  )
}

export default SidebarItem
