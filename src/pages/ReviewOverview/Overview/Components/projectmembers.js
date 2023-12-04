import React from "react"
import { Table } from "reactstrap"

const ProjectMembers = () => {
  const data = [
    { id: 1, role: "Manager", member: "Ashutosh Gupta" },
    { id: 2, role: "Supervisor", member: "Samriddha Choudhari" },
    { id: 3, role: "Team Members", member: "Dharang Sharma, Tuhin Das" },
  ]

  const renderTableRows = () => {
    return data.map(row => (
      <tr key={row.id}>
        <td style={{ backgroundColor: "#e0e4f4", border: "2px solid white" }}>
          {row.role}
        </td>
        <td style={{ backgroundColor: "#e0e4f4", border: "2px solid white" }}>
          {row.member}
        </td>
      </tr>
    ))
  }

  return (
    <Table bordered>
      <thead>
        <tr>
          <th
            colSpan="2"
            style={{ backgroundColor: "#182c4c", color: "white" }}
          >
            Project
          </th>
        </tr>
        <tr>
          <th style={{ backgroundColor: "#e0e4f4", border: "2px solid white" }}>
            Role
          </th>
          <th style={{ backgroundColor: "#e0e4f4", border: "2px solid white" }}>
            Member
          </th>
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </Table>
  )
}

export default ProjectMembers
