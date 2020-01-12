import React, { useState,useContext } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

function Login(props) {
  const context = useContext(AuthContext)
  const initalState = {
    username: "",
    password: ""
  };
  const [errors, setErrors] = useState({});
  const [values, onChange, onSubmit] = useForm(loginUserCallback, initalState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      // we can destructure result to data:{login:userData} - userData is alias to 'login' data
      console.log('result is',result)
      context.login(result.data.login)
      props.history.push("/");
    },
    onError(err) {
      console.log("err", err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} loading={loading}>
        <h1>Login</h1>
        <Form.Input
          error={
            errors.username && { content: errors.username, pointing: "above" }
          }
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={onChange}
          type="text"
        />

        <Form.Input
          error={
            errors.password && { content: errors.password, pointing: "above" }
          }
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Login
        </Button>
        <Message
          visible={Object.values(errors).length != 0}
          error
          header="There was some errors with your submission"
          list={Object.values(errors)}
        />
      </Form>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
