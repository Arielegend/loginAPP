import React, { FC, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ValidAsEmail, ValidAsPassword } from "../utils/Common";
import { useHistory } from "react-router-dom";
import { User } from "../utils/Types";
import { loginAuth } from "../utils/API";

// setUser ->
//           Once logged in, we setUser at APP level.
interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginPage: FC<LoginProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const loading indicates sending POST msgs, waiting for approval
  const [loading, setLoading] = useState(false);

  function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit() {
    // untill done fetching user, loading is TRUE
    setLoading(true);
    const user: User | undefined = await loginAuth(email, password);
    setLoading(false);

    if (user) {
      props.setUser(user);
      history.push("/info");
    }
  }

  // Each time we make input to email AND password field,
  // this function is invoked, checking their both validity
  // In case both valid -> buttn will be able to be pressed and log in...
  useEffect(() => {
    const areParamsValid: boolean =
      ValidAsEmail(email) && ValidAsPassword(password);
    setValid(areParamsValid);
  }, [email, password]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordInput}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={!valid}
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>{/* <Copyright /> */}</Box>
      {loading ? (
        <div className="Loading">
          <b>loading</b>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};
