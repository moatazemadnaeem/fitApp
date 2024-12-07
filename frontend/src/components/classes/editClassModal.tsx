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
import { fitClassEditBody, modalInter } from "../../types";
import dayjs from "dayjs";
import {
  validateTitle,
  validateDescription,
  validateStartDate,
  validateEndDate,
  validateMaxAttendees,
} from "../../utils/validations";
import { editCreatedClassesApi } from "../../api/fitClasses";
const EditClassModal: React.FC<modalInter> = ({
  isModalOpen,
  setIsModalOpen,
  record,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [stDate, setStDate] = useState<dayjs.Dayjs>(
    dayjs(record.startDate, "YYYY-MM-DD")
  );
  const [enDate, setEnDate] = useState<dayjs.Dayjs>(
    dayjs(record.timePeriod, "YYYY-MM-DD")
  );
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        startDate: dayjs(record.startDate, "YYYY-MM-DD"),
        timePeriod: dayjs(record.timePeriod, "YYYY-MM-DD"),
      });
    }
  }, [record]);
  const handleEditClassApi = async (values: fitClassEditBody) => {
    try {
      const body = {
        ...values,
        classId: record._id,
      };
      setLoading(true);
      const data = await editCreatedClassesApi(body);
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
      title="Edit Class"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleEditClassApi}>
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
        <Form.Item className="edit-class-btn">
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

export default EditClassModal;
