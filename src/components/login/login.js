import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import classes from "./login.module.css";

import * as actionTypes from "../../store/actions/moviesActions";

import Input from "../input/input";
import Button from "../button/button";
import Spinner from "../spinner/spinner";

class Login extends Component {
  state = {
    newName: "",
    newEmail: "",
    newPassword: "",
    email: "",
    password: "",
    signupData: "",
    continue: "",
    loading: false,
    errorMessage: "",
    loggedIn: false,
    userName: "",
    userId: "",
    loggingError: "",
  };

  handleLogin = (event) => {
    event.preventDefault();
    // http request
    if (this.state.email && this.state.password) {
      axios
        .post("http://localhost:8080/signin", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((result) => {
          if (result.data.user && result.data.id) {
            this.setState({
              loggedIn: true,
              userName: result.data.user,
              userId: result.data.id,
            });
            this.props.onLogin(result.data.user, result.data.id);
            console.log(
              "loggedIn: ",
              this.state.loggedIn,
              "userId: ",
              this.state.userId,
              "userName: ",
              this.state.userName
            );
            this.props.history.push("/");
          }

          if (!result.data.user) {
            this.setState({
              loggingError: result.data.message,
            });
            console.log("LoggingError: ", this.state.loggingError);
          }
        })
        .catch((err) => {
          console.log("ErrorWhenLogin: ", err);
        });
    }
  };

  handleCreateAccount = (event) => {
    event.preventDefault();
    // http request
    if (this.state.newName && this.state.newEmail && this.state.newPassword) {
      this.setState({
        loading: true,
        continue: "",
        signupData: "",
        errorMessage: "",
      });
      axios
        .post("http://localhost:8080/signup", {
          name: this.state.newName,
          email: this.state.newEmail,
          password: this.state.newPassword,
        })
        .then((response) => {
          this.setState({
            signupData: response.data.message,
            loading: false,
            newName: "",
            newEmail: "",
            newPassword: "",
          });
          if (response.data.email) {
            this.setState({
              continue: " Nyní se mužete výše přihlásit!",
            });
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          this.setState({
            errorMessage: error.message,
          });
          console.log("errorMessage: ", this.state.errorMessage);
        });
    }
  };

  setEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  setPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  setNewPassword = (event) => {
    this.setState({
      newPassword: event.target.value,
    });
  };

  setNewName = (event) => {
    this.setState({
      newName: event.target.value,
    });
  };

  setNewEmail = (event) => {
    this.setState({
      newEmail: event.target.value,
    });
  };

  handleLogout = () => {
    this.props.onLogout();
  };

  render() {
    // console.log(
    //   `Name: ${this.state.newName}, email: ${this.state.newEmail}, password: ${this.state.newPassword}`
    // );

    const signedIn = (
      <div className={classes.ListLogout}>
        <h4 className={classes.HeadingLogout}>{`Přihlášen uživatel ${this.props.userName}`}</h4>
        <p>{`User id: ${this.props.userId}`}</p>
        <Button title="Odhlásit" onClick={this.handleLogout} />
      </div>
    );

    const signedOut = (
      <React.Fragment>
        <div className={classes.List}>
          <h4 className={classes.Heading}>Zde se prosím přihláste!</h4>
          <form className={classes.FormBody} onSubmit={this.handleLogin}>
            <Input
              type="email"
              placeholder="Your e-mail address"
              onChange={this.setEmail}
              value={this.state.email}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={this.setPassword}
              value={this.state.password}
            />
            <Button type="submit" title="Přihlásit" />
            {this.state.loggingError ? <p>{this.state.loggingError}</p> : null}
          </form>
        </div>
        <div className={classes.List}>
          <h4 className={classes.Heading}>Zde si můžete vytvořit nový účet!</h4>
          <form className={classes.FormBody} onSubmit={this.handleCreateAccount}>
            <Input
              type="text"
              placeholder="Jméno"
              onChange={this.setNewName}
              value={this.state.newName}
            />
            <Input
              type="email"
              placeholder="Your e-mail address"
              onChange={this.setNewEmail}
              value={this.state.newEmail}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={this.setNewPassword}
              value={this.state.newPassword}
            />
            <Button type="submit" title="Vytvořit" />
          </form>
          {this.state.signupData ? <p>{this.state.signupData + this.state.continue}</p> : null}
          {this.state.loading && <Spinner />}
          <div>First cleanup --- test git commit + ignoring .eslintcache</div>
        </div>
      </React.Fragment>
    );
    let content;
    if (this.props.userName) {
      content = signedIn;
    } else {
      content = signedOut;
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.movies.userName,
    userId: state.movies.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (userName, userId) =>
      dispatch({ type: actionTypes.LOGIN, userName: userName, userId: userId }),
    onLogout: () => dispatch({ type: actionTypes.LOGOUT, newMovies: [] }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
