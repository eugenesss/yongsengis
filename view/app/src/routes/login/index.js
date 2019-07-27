import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import QueueAnim from "rc-queue-anim";

// app config
import AppConfig from "Constants/AppConfig";

// redux action
import { login } from "Actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onUserLogin = this.onUserLogin.bind(this);
  }

  /**
   * On User Login
   */
  onUserLogin(e) {
    e.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.login(this.state);
    }
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
          <div className="session-inner-wrapper">
            <div className="container">
              <div className="row row-eq-height">
                <div className="col-md-2" />
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <div className="session-body bg-secondary text-center">
                    <div className="session-head mb-30">
                      <Link to="/">
                        <h2 className="font-weight-bold text-white">
                          <img
                            src={AppConfig.appLogo}
                            alt="session-logo"
                            className="img-fluid mr-10"
                            width="50"
                            height="35"
                          />
                          {AppConfig.brandName}
                        </h2>
                      </Link>
                    </div>
                    <Form onSubmit={this.onUserLogin}>
                      <FormGroup className="has-wrapper">
                        <Input
                          type="mail"
                          value={email}
                          name="user-mail"
                          id="user-mail"
                          className="has-input input-lg"
                          placeholder="Enter Email Address"
                          onChange={event =>
                            this.setState({ email: event.target.value })
                          }
                        />
                        <span className="has-icon">
                          <i className="ti-email" />
                        </span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input
                          value={password}
                          type="Password"
                          name="user-pwd"
                          id="pwd"
                          className="has-input input-lg"
                          placeholder="Password"
                          onChange={event =>
                            this.setState({ password: event.target.value })
                          }
                        />
                        <span className="has-icon">
                          <i className="ti-lock" />
                        </span>
                      </FormGroup>
                      <FormGroup className="mb-15">
                        <Button
                          color="primary"
                          className="btn-block text-white w-100"
                          variant="contained"
                          size="large"
                          type="submit"
                          //onClick={() => this.onUserLogin()}
                        >
                          Sign In
                        </Button>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>With love.</p>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
