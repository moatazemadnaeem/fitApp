import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import "./signin.css";
import { validateEmail, validatePassword } from "../../utils/validations";
import { UserSignInInter } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../types";
import { signInApi } from "../../api/users";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector<RootState>(
    (state) => state.user.loading
  ) as boolean;
  const handleSignInApi = async (values: UserSignInInter) => {
    try {
      await signInApi(values, dispatch);
      navigate("/");
    } catch (error: any) {
      message.error(error);
    }
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
          <Button loading={loading} type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
