import React, { useState } from "react";
import { Modal, Button, Form, message } from "antd";
import { fitClassEditBody, modalDeleteInter } from "../../types";

import { deleteClassesApi } from "../../api/fitClasses";
const DeleteClassModal: React.FC<modalDeleteInter> = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  classId,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClassApi = async () => {
    try {
      setLoading(true);
      const data = await deleteClassesApi(classId);
      if (data.status) {
        message.success(data.msg);
        setIsDeleteModalOpen(false);
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
      title="Delete Class"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleDeleteClassApi}>
        <h3>Are you sure you want to delete this class?</h3>
        <div className="delete-btn-container">
          <Form.Item>
            <Button
              loading={loading}
              className="btn-red"
              type="primary"
              htmlType="submit"
            >
              Confirm
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="btn-yellow"
              type="primary"
            >
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default DeleteClassModal;
