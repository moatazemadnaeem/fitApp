import React, { useState } from "react";
import { Modal, Button, Form, Input, InputNumber, DatePicker } from "antd";
import { modalInter } from "../../types";

const EditClassModal: React.FC<modalInter> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Edit Class"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default EditClassModal;
