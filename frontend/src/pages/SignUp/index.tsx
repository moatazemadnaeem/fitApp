import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./signup.css";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../utils/validations";
const SignUp = () => {
  const handleSignUpApi = async (values: any) => {
    console.log(values);
  };
  return (
    <div className="container-form">
      <Form
        className="signup"
        name="signup_form"
        layout="vertical"
        onFinish={handleSignUpApi}
      >
        <Form.Item
          className="name"
          name="name"
          label="Name"
          rules={[
            {
              validator: validateName,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="email"
          name="email"
          label="Email"
          rules={[
            {
              validator: validateEmail,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="password"
          name="password"
          label="Password"
          rules={[
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="link">
          <span>Already Have An Account? </span>
          <Link to="/signin">SignIn</Link>
        </Form.Item>
        <Form.Item className="button">
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
