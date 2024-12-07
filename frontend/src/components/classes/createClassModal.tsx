import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import { fitClassEditBody, modalCreateInter, modalInter } from "../../types";
import dayjs from "dayjs";
import {
  validateTitle,
  validateDescription,
  validateStartDate,
  validateEndDate,
  validateMaxAttendees,
} from "../../utils/validations";
import { createClassesApi } from "../../api/fitClasses";
const CreateClassModal: React.FC<modalCreateInter> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [stDate, setStDate] = useState<dayjs.Dayjs>(
    dayjs(new Date(), "YYYY-MM-DD")
  );
  const [enDate, setEnDate] = useState<dayjs.Dayjs>(
    dayjs(new Date(), "YYYY-MM-DD")
  );
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    form.validateFields();
  }, [form.getFieldValue("startDate"), form.getFieldValue("timePeriod")]);
  const handleCreateClassApi = async (values: fitClassEditBody) => {
    try {
      setLoading(true);
      const data = await createClassesApi(values);
      if (data.status) {
        message.success(data.msg);
        setIsModalOpen(false);
        window.location.reload();
      }
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Create Class"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateClassApi}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ validator: validateTitle }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ validator: validateDescription }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="maxAttendees"
          label="Max Attendees"
          rules={[{ validator: validateMaxAttendees }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          rules={[
            { validator: (_, value) => validateStartDate(_, value, enDate) },
          ]}
          name="startDate"
          label="Start Date"
        >
          <DatePicker
            onChange={(val) => {
              setStDate(val);
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              validator: (_, value) => validateEndDate(_, value, stDate),
            },
          ]}
          name="timePeriod"
          label="End Date"
        >
          <DatePicker
            onChange={(val) => {
              setEnDate(val);
            }}
          />
        </Form.Item>
        <Form.Item className="create-edit-class-btn">
          <Button
            loading={loading}
            className="btn-orange"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateClassModal;
