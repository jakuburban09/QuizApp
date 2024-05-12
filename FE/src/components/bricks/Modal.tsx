import React, { FC } from "react";
import Button, { IconPosition } from "./Button";
import Text from "./Text";
import { Color } from "helpers/enums";

type ModalProps = {
  title: string;
  text: string;
  onConfirm: () => void;
  onReject: () => void;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({
  title,
  text,
  onConfirm,
  onReject,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-2xl">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-purpleishWhite rounded-xl text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full shadow-basic z-50">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <Button
                  onClickButton={onClose}
                  hiearchy="secondary"
                  icon={{ iconName: "XLg" }}
                >
                  {" "}
                </Button>
              </div> */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Text
                  style="h4"
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {title}
                </Text>
                <div className="mt-2">
                  <Text style="p" className="text-sm text-gray-500">
                    {text}
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-between bg-gray-50 px-4 py-3 sm:px-6">
            <Button
              onClickButton={onReject}
              icon={{ iconName: "XLg" }}
              color={Color.Red600}
              className="w-full"
            >
              Cancel
            </Button>

            <Button
              onClickButton={onConfirm}
              icon={{ iconName: "CheckLg" }}
              color={Color.Green700}
              iconPosition={IconPosition.Right}
              className="w-full"
            >
              Confirm
            </Button>

            {/* <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
