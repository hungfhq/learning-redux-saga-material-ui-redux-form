const styles = (theme) => ({
  TaskBoard: {
    width: "90vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    border: "1px solid red",
    padding: "10px"
  },
  shape: {
    backgroundColor: theme.color.primary,
    color: theme.shape.textColor,
    padding: "4px"
  }
})

export default styles
