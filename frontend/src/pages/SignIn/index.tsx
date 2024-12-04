import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./signin.css";
import { validateEmail, validatePassword } from "../../utils/validations";
const SignIn = () => {
  const handleSignInApi = async (values: any) => {
    console.log(values);
  };
  return (
    <div className="container-form">
      <Form
        className="signin"
        name="signin_form"
        layout="vertical"
        onFinish={handleSignInApi}
      >
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
          <span>Do Not Have an account? </span>
          <Link to="/signup">SignUp</Link>
        </Form.Item>
        <Form.Item className="button">
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
