import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import "./signup.css";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../utils/validations";
import { signUpUserApi } from "../../api/users";
import { UserSignUpInter } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSignUpApi = async (values: UserSignUpInter) => {
    try {
      setLoading(true);
      const data = await signUpUserApi(values);
      if (data && data.status) {
        return navigate("/signin");
      }
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
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
          <Button loading={loading} type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
