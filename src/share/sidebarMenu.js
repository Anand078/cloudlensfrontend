import React from "react"
import { Link } from "react-router-dom"

function SideBarMenu({ props, config }) {
  const { title, icon, subdata } = config
  return (
    <>
      <li>
        <Link to="/#" className="has-arrow waves-effect">
          <i className={props.t(icon)}></i>
          <span>{props.t(title)}</span>
        </Link>
        <ul className="sub-menu" aria-expanded="false">
          {subdata.map((item ,index) => (
            <li key={index}>
              <Link to={item.link}>{props.t(item.title)}</Link>
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}

export default SideBarMenu
