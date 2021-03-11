const validate = values => {
  const { title } = values
  const errors = {}
  if (!title) {
    errors.title = 'please enter text'
  } else if (title.trim().length < 10) {
    errors.title = 'minimum 10'
  }
  return errors
}

export default validate
