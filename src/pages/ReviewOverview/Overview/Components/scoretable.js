import React from "react"
import { Table } from "reactstrap" // Assuming you are using Reactstrap for styling

const ScoreTable = () => {
  const data = [
    {
      Scope: "Cost Optimization",
      Topics: 11,
      "Best Practices": 49,
      Compliant: 12,
      "Non Compliant": 35,
      "Not Applicable": 2,
      Score: "26%",
      Status: "Critical Score",
    },
    {
      Scope: "Security",
      Topics: 11,
      "Best Practices": 65,
      Compliant: 18,
      "Non Compliant": 40,
      "Not Applicable": 7,
      Score: "31%",
      Status: "Low Score",
    },
    {
      Scope: "Operations",
      Topics: 11,
      "Best Practices": 83,
      Compliant: 17,
      "Non Compliant": 45,
      "Not Applicable": 21,
      Score: "27%",
      Status: "Critical Score",
    },
    {
      Scope: "Reliability",
      Topics: 13,
      "Best Practices": 67,
      Compliant: 37,
      "Non Compliant": 22,
      "Not Applicable": 8,
      Score: "63%",
      Status: "Medium Score",
    },
    {
      Scope: "Sustainability",
      Topics: 6,
      "Best Practices": 28,
      Compliant: 8,
      "Non Compliant": 10,
      "Not Applicable": 10,
      Score: "44%",
      Status: "Low Score",
    },
    {
      Scope: "Performance",
      Topics: 8,
      "Best Practices": 42,
      Compliant: 17,
      "Non Compliant": 18,
      "Not Applicable": 7,
      Score: "49%",
      Status: "Low Score",
    },
  ]
  const totals = {
    Scope: "Total",
    Topics: data.reduce((sum, row) => sum + row.Topics, 0),
    "Best Practices": data.reduce((sum, row) => sum + row["Best Practices"], 0),
    Compliant: data.reduce((sum, row) => sum + row.Compliant, 0),
    "Non Compliant": data.reduce((sum, row) => sum + row["Non Compliant"], 0),
    "Not Applicable": data.reduce((sum, row) => sum + row["Not Applicable"], 0),
    Score: "39%", // You can leave Score and Status empty for totals
    Status: "Critical Score",
  }
  return (
    <div className="table-responsive">
      <Table className="table mb-0">
        <thead className="table-light">
          <tr>
            <th>Scope</th>
            <th>Topics</th>
            <th>Best Practices</th>
            <th>Compliant</th>
            <th>Non Compliant</th>
            <th>Not Applicable</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Scope}</td>
              <td>{row.Topics}</td>
              <td>{row["Best Practices"]}</td>
              <td>{row.Compliant}</td>
              <td>{row["Non Compliant"]}</td>
              <td>{row["Not Applicable"]}</td>
              <td>{row.Score}</td>
              <td>{row.Status}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>{totals.Scope}</strong>
            </td>
            <td>
              <strong>{totals.Topics}</strong>
            </td>
            <td>
              <strong>{totals["Best Practices"]}</strong>
            </td>
            <td>
              <strong>{totals.Compliant}</strong>
            </td>
            <td>
              <strong>{totals["Non Compliant"]}</strong>
            </td>
            <td>
              <strong>{totals["Not Applicable"]}</strong>
            </td>
            <td>
              <strong>{totals.Score}</strong>
            </td>
            <td>
              <strong>{totals.Status}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default ScoreTable
