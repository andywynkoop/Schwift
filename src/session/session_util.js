export const signInValidate = ({ email, password }) => {
  const errors = {}
  if (!email) errors.email = "How the hell are you supposed to sign in without an email address? "
  else if (email.length < 6) errors.email = "Your email address is wayyyyy too short, pal. "
  else if (!email.includes("@")) errors.email = "That email address doesn't even have the little @ thing. "

  if (!password) errors.password = "You didn't even write a password. "
  if (password.length < 8) errors.password = "That password isn't even long enough to be a valid password. "
  return errors;
}