import React from "react"
import { Table } from "reactstrap" // Assuming you are using Reactstrap for styling

const ScoreTable = ({ arbScoreData }) => {
  const totals = {
    Scope: "Total",
    Topics: arbScoreData.reduce((sum, row) => sum + (row.topics || 0), 0),
    "Best Practices": arbScoreData.reduce(
      (sum, row) => sum + (row.bestpractices || 0),
      0
    ),
    Compliant: arbScoreData.reduce((sum, row) => sum + (row.compliant || 0), 0),
    "Non Compliant": arbScoreData.reduce(
      (sum, row) => sum + (row.noncompliant || 0),
      0
    ),
    "Not Applicable": arbScoreData.reduce(
      (sum, row) => sum + (row.notapplicable || 0),
      0
    ),
    Score: "39%", //hard-coded
    Status: "Critical Score", //hard coded
  }

  console.log("anand", arbScoreData)

  return (
    <div className="table-responsive">
      <Table className="table mb-0">
        <thead className="table-light">
          <tr>
            <th>Pillar</th>
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
          {arbScoreData.map((row, index) => (
            <tr key={index}>
              <td>{row.pillarname}</td>
              <td>{row.topics}</td>
              <td>{row.bestpractices}</td>
              <td>{row.compliant}</td>
              <td>{row.noncompliant}</td>
              <td>{row.notapplicable}</td>
              <td>{row.score}</td>
              <td>{row.status}</td>
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
