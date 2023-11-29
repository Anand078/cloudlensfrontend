import React from "react"
import { Badge } from "reactstrap"

const classNames = ["primary", "success", "info", "warning", "danger", "dark"]

const CoreSkillBadge = ({ skills }) => {
  console.log("skskk", skills)
  const getRandomColor = usedColors => {
    const availableColors = classNames.filter(
      color => !usedColors.includes(color)
    )

    if (availableColors.length === 0) {
      usedColors.length = 0
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length)
    const selectedColor = availableColors[randomIndex]
    usedColors.push(selectedColor)

    return selectedColor
  }

  const renderBadges = badgeArray => {
    const badgesPerLine = 4
    const usedColors = []

    return badgeArray
      .reduce((rows, badge, index) => {
        if (index % badgesPerLine === 0) {
          rows.push([])
        }
        rows[rows.length - 1].push(badge)
        return rows
      }, [])
      .map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((badge, badgeIndex) => (
            <React.Fragment key={badgeIndex}>
              <Badge color={getRandomColor(usedColors)}>{badge}</Badge>{" "}
            </React.Fragment>
          ))}
        </div>
      ))
  }
  let skillArray
  if (skills && skills.trim() !== "") {
    skillArray = skills
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean)
  } else {
    skillArray = []
  }
  return (
    <div className="text-left" style={{ whiteSpace: "pre-line" }}>
      {renderBadges(skillArray)}
    </div>
  )
}

export default CoreSkillBadge
