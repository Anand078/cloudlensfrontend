const allColors = ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf"]

export const ColorPicker = numberOfColors => {
  if (numberOfColors <= 0) return []

  const distinctColors = []
  const shuffledColors = [...allColors].sort(() => Math.random() - 0.5)

  for (const color of shuffledColors) {
    if (distinctColors.length === numberOfColors) {
      break
    }

    if (!distinctColors.includes(color)) {
      distinctColors.push(color)
    }
  }

  return distinctColors
}
