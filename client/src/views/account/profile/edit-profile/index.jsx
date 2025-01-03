import { useState } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditProfileForm from "./EditProfileForm";

function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSuccess = () => {
    setIsModalOpen(false); // Close modal on successful profile update
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="link"
        shape="round"
        size="large"
        className="!text-gray-700 hover:!bg-slate-100"
        icon={<EditOutlined size={16} />}
        iconPosition="start"
      >
        Edit Profile
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        title="Edit Account"
        footer={null}
        style={{ borderRadius: "100px", textAlign: "center" }}
      >
        <EditProfileForm onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}

export default EditProfile;
