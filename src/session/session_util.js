export const signInValidate = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "How do you expect to sign in without an email address? ";
  else if (email.length < 6) errors.email = "That email address is wayyyyy too short, pal. ";
  else if (!email.includes("@")) errors.email = "That email address doesn't even have the little @ thing. ";

  if (!password) errors.password = "You didn't even write a password. ";
  if (password.length < 8) errors.password = "That password isn't even long enough to be a valid password. ";
  return errors;
}

export const signUpValidate = ({ email, password, firstname, lastname, username }) => {
  const errors = {};
  if (!email) errors.email = "You're going to need an email address to sign up for an account. ";
  else if (email.length < 6) errors.email = "That email address is wayyyyy too short, pal. ";
  else if (!email.includes("@")) errors.email = 'That "email address" doesn\'t even have the little @ thing. ';

  if (!firstname) errors.firstname = "You didn't give a first name. ";

  if (!lastname) errors.lastname = "You didn't give a last name. ";

  if (!username) errors.username = "You didn't give a username. ";
  
  if (!password) errors.password = "You didn't even write a password. ";
  if (password.length < 8) errors.password = "You need to come up with a password that's AT LEAST 8 characters. ";
  return errors;
}