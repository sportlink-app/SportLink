import { Button, Input, message, Modal, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import completeProfileStore from "../../../../store/user/completeProfileStore";
import { useState } from "react";
import { auth } from "../../../../config/firebase-config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

export default function PhoneVerification() {
  const { updateForm, updateValidationErrors, selectedCode } =
    completeProfileStore((state) => ({
      updateForm: state.updateForm,
      updateValidationErrors: state.updateValidationErrors,
      selectedCode: state.selectedCode,
    }));
  const phoneVerified = completeProfileStore((state) => state.phoneVerified);
  const errors = updateValidationErrors();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);

    // Ensure that reCAPTCHA is initialized once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
        },
        auth
      );

      // Disable app verification for testing (set directly on auth instance)
      auth.settings.appVerificationDisabledForTesting = true;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSendCode = () => {
    if (!updateForm.tel) {
      messageApi.error("Phone number is missing.");
      return;
    }

    const phoneNumber = selectedCode + updateForm.tel; // Full phone number
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        messageApi.success("Code sent successfully.");
      })
      .catch((error) => {
        console.error("Error during phone number sign-in:", error);
        messageApi.error("Failed to send verification code. Check reCAPTCHA.");
      });
  };

  const handleVerifyCode = () => {
    if (!verificationId || !verificationCode) {
      messageApi.error("Verification code or ID is missing.");
      return;
    }

    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        messageApi.success("Phone number verified successfully.");
        // Handle further actions, like updating phoneVerified status
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
        messageApi.error("Failed to verify code. Please try again.");
      });
  };

  return (
    <>
      {contextHolder}
      <div className="h-full pt-8">
        <Tooltip title="Verify your phone number" color="green">
          <Button
            onClick={showModal}
            disabled={updateForm.tel == null || errors.tel || phoneVerified}
            size="large"
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green"
          />
        </Tooltip>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="py-2 px-3">
          <h1 className="text-slate-800 text-lg">Verify Your Phone Number</h1>
          <p className="text-sm text-gray-500 mt-3">
            A verification code will be sent to{" "}
            <span style={{ color: "#1e293b", fontWeight: "600" }}>
              {selectedCode} {updateForm.tel}
            </span>
            . Please enter the code below to complete the verification process.
          </p>
          <div className="flex justify-center mt-4">
            <Input
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              size="large"
              placeholder="Enter verification code"
            />
          </div>
          <div className="mt-6 sm:flex sm:flex-row-reverse">
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={handleVerifyCode}
              className="!bg-green hover:!bg-green hover:brightness-105 disabled:!bg-green"
            >
              Verify Code
            </Button>
            <Button
              type="default"
              shape="round"
              size="large"
              onClick={handleSendCode}
              className="mr-3"
            >
              Send Code
            </Button>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      </Modal>
    </>
  );
}
