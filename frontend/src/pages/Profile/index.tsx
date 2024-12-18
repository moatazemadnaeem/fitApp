import "./profile.css";
import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { validateName, validatePassword } from "../../utils/validations";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState, UserEditInter } from "../../types";
import { editUserApi, signOutUserApi } from "../../api/users";
const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [signOutLoading, setSignOutLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [dropPass, setDropPass] = useState<boolean>(false);
  const [form] = Form.useForm();
  const user = useSelector<RootState>(
    (state) => state.user.user
  ) as UserEditInter;
  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
    });
  }, [user, form]);
  const handleEditUserApi = async (values: UserEditInter) => {
    try {
      setLoading(true);
      const data = await editUserApi(values);
      if (data.status) {
        message.success(data.msg);
        window.location.reload();
      }
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignOutUserApi = async () => {
    try {
      setSignOutLoading(true);
      await signOutUserApi(dispatch);
      window.location.reload();
    } catch (error: any) {
      message.error(error);
    } finally {
      setSignOutLoading(false);
    }
  };
  return (
    <div className="profile-container">
      <h3>
        Edit Your <span style={{ color: "var(--mainColor)" }}>Profile Now</span>
      </h3>
      <Form
        form={form}
        className="profile"
        name="profile_form"
        layout="vertical"
        onFinish={handleEditUserApi}
      >
        <Form.Item
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
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item className="button-edit-user">
          <Button className="btn-orange" onClick={() => setDropPass(!dropPass)}>
            Edit Password
          </Button>
        </Form.Item>
        {dropPass && (
          <Form.Item
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
        )}

        <Form.Item className="button-edit-user">
          <Button
            className="btn-orange"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button
        style={{ marginTop: "1rem" }}
        className="btn-red-dark"
        type="primary"
        loading={signOutLoading}
        onClick={handleSignOutUserApi}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Profile;
