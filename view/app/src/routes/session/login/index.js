/**
 * Login Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from "@material-ui/core/Fab";

// app config
import AppConfig from "Constants/AppConfig";

// redux action
import { signInAccount } from "Ducks/session/auth";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
    };
    this.onUserLogin = this.onUserLogin.bind(this);
  }

  /**
   * On User Login
   */
  onUserLogin = e => {
    e.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.signInAccount(this.state, this.props.history);
    } else {
      this.setState({ error: "Email and password field can't be empty!" });
    }
  };

  render() {
    const { email, password } = this.state;
    const { loading, error } = this.props;

    return (
      <div className="login_index">
        {loading && <LinearProgress />}

        <div className="login_module">
          <div className="row justify-content-center">
            <div className="col-md-8 col-sm-12">
              <div className="session-body text-center">
                <div className="logo-mini" style={{ textAlign: "left" }}>
                  <a href="/">
                    <img src={AppConfig.appLogo} alt="site logo" height="100" />
                  </a>
                  <h2>{AppConfig.brandName}</h2>
                </div>
                <p className="session-head fw-light text-left mb-30 fs-14 text-muted">
                  {AppConfig.tagLine}
                </p>

                <Form onSubmit={this.onUserLogin}>
                  <FormGroup className="has-wrapper">
                    <Input
                      type="email"
                      value={email}
                      style={email ? EmailStyle : emptyField}
                      name="email"
                      id="email"
                      className="has-input input-lg"
                      placeholder="Enter Email Address"
                      onChange={event =>
                        this.setState({ email: event.target.value })
                      }
                    />
                  </FormGroup>

                  <div className="mb-40">
                    <FormGroup
                      className="has-wrapper"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      <Input
                        value={password}
                        style={password ? PasswordStyle : emptyField}
                        type="Password"
                        name="password"
                        id="password"
                        className="has-input input-lg"
                        placeholder="Password"
                        onChange={event =>
                          this.setState({ password: event.target.value })
                        }
                      />
                    </FormGroup>
                    {this.state.error && (
                      <div className="mt-10">
                        <p className="text-danger">{this.state.error}</p>
                      </div>
                    )}
                    <FormGroup className="my-20">
                      <Fab
                        variant="extended"
                        className="text-white my-20"
                        size="medium"
                        color="primary"
                        type="submit"
                      >
                        <span className="px-10">Sign in</span>
                      </Fab>
                    </FormGroup>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="login_placeholder"
          style={{ flexDirection: "column", justifyContent: "center" }}
        >
          <img
            src={require("Assets/img/appSignIn_yellow.png")}
            alt="site logo"
            style={{
              height: "45%",
              marginBottom: 25
            }}
          />

          <h2 className="text-center">Automate Your Workflow</h2>
          <p className="session-head fw-light text-center mb-30 fs-14 text-muted">
            Digitalise your work processes to cloud
            <br />
            Accessable anywhere and anytime
          </p>
        </div>
      </div>
    );
  }
} // map state to props
const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { user, loading, error } = authState;
  return { user, loading, error };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      signInAccount
    }
  )(Signin)
);

const emptyField = {
  borderBottom: "0.3px solid rgba(0,0,0,0.5)",
  borderRadius: 0,
  padding: 0,
  boxShadow: "none",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  fontWeight: "300",
  fontSize: "12px",
  color: "#ebedf2",
  caretColor: "black",
  height: 35
};

const PasswordStyle = {
  borderBottom: "0.3px solid rgba(0,0,0,0.5)",
  borderRadius: 0,
  padding: 0,
  boxShadow: "none",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  fontWeight: "400",
  fontSize: "14px",
  color: "black",
  letterSpacing: "8px",
  caretColor: "black",
  height: 35
};

const EmailStyle = {
  borderBottom: "0.3px solid rgba(0,0,0,0.5)",
  borderRadius: 0,
  padding: 0,
  boxShadow: "none",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  fontWeight: "400",
  fontSize: "14px",
  color: "black",
  caretColor: "black",
  height: 35
};

// ipad size for width 768px
// mini 768px for sign up and placeholder

// less than or equal to 767px display only sign up
