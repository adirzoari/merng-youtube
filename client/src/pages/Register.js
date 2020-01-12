import React, { useState,useContext } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

function Register(props) {
  const context = useContext(AuthContext)

  const [errors, setErrors] = useState({});
 

  const initalState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const [values,onChange,onSubmit] = useForm(registerUser,initalState)


  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      // we can destructure result to data:{register:userData} - userData is alias to 'register' data

      context.login(result.data.register)

      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser(){
      addUser();
  }


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} loading={loading}>
        <h1>Register</h1>
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
          error={errors.email && { content: errors.email, pointing: "above" }}
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          type="email"
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
        <Form.Input
          error={
            errors.password && { content: errors.password, pointing: "above" }
          }
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
