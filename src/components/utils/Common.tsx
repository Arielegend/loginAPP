// Function gets a string, returns True if in format of emailAddress
export function ValidAsEmail(email: string) {
  const regexEmail = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regexEmail.test(email);
}

// Function gets a string, returns True if it contains (At least) 1 UpperCase & digit (and length is at least 8)
export function ValidAsPassword(password: string) {
  const regexPassword = new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/);
  return regexPassword.test(password);
}

export function Contain1Char(str: string) {
  if (str.length > 0) {
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i).toUpperCase() === str.charAt(i)) return true;
    }
  }
  return false;
}

export function Contain1Digit(str: string) {
  if (str.length > 0) {
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) > "0" && str.charAt(i) < "10") return true;
    }
  }
  return false;
}
