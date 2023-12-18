import React from "react"
import { Table } from "reactstrap" // Assuming you are using Reactstrap for styling

const ScoreTable = ({ arbScoreData }) => {
  const totals = {
    Scope: "Overall",
    Topics: 0,
    "Best Practices": 0,
    Compliant: 0,
    "Non Compliant": 0,
    "Not Applicable": 0,
    Score: 0,
    Status: "",
  }

  arbScoreData.forEach(row => {
    totals.Topics += row.topics || 0
    totals["Best Practices"] += row.bestpractices || 0
    totals.Compliant += row.compliant || 0
    totals["Non Compliant"] += row.noncompliant || 0
    totals["Not Applicable"] += row.notapplicable || 0
  })

  totals.Score = Math.round(
    ((totals.Compliant || 0) /
      (totals["Best Practices"] - totals["Not Applicable"])) *
      100 || 0
  )

  if (totals.Score <= 30) {
    totals.Status = "Critical Score"
  } else if (totals.Score < 50) {
    totals.Status = "Low Score"
  } else if (totals.Score < 70) {
    totals.Status = "Medium Score"
  } else {
    totals.Status = "Compliant"
  }

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
              <strong>{totals.Score}%</strong>
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
