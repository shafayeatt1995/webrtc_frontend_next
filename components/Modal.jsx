"Use client";
import React from "react";
import Button from "./Button";

export default function Modal({
  children,
  title,
  close,
  submit,
  size = "lg",
  loading = false,
}) {
  const header = React.Children.toArray(children).find(
    (child) => child.props.slot === "header"
  );
  const body = React.Children.toArray(children).find(
    (child) => child.props.slot === "body"
  );
  const footer = React.Children.toArray(children).find(
    (child) => child.props.slot === "footer"
  );
  const getWidth = () => {
    if (size === "xl") {
      return "lg:w-3/4";
    } else if (size === "lg") {
      return "lg:w-2/4";
    } else if (size === "sm") {
      return "lg:w-1/3";
    } else if (size === "fixed") {
      return `lg:w-[650px]`;
    }
  };

  return (
    <div className="relative flex justify-center z-[999]">
      <div className="fixed inset-0 z-40 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-gray-500/70 backdrop-blur-md">
          <div
            className={`absolute lg:relative bottom-0 inline-block p-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl w-full sm:align-middle opacity-100 ${getWidth()}`}
          >
            {header || (
              <div className="flex items-center pb-3 border-b border-gray-300">
                <h3 className="text-gray-800 text-xl font-bold flex-1">
                  {title}
                </h3>
                <i
                  className="fas fa-xmark text-xl pr-2 cursor-pointer"
                  onClick={close}
                ></i>
              </div>
            )}
            <div className="max-h-[75vh] overflow-y-auto">
              {body || children}
            </div>
            <div className="static bottom-0">
              {footer || (
                <div className="border-t border-gray-300 pt-4 flex justify-end gap-4">
                  <Button type="button" onClick={close} variant="lightGray">
                    Close
                  </Button>
                  <Button type="button" onClick={submit} loading={loading}>
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
