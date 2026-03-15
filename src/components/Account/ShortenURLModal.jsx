import React, { useState } from "react";

const ShortenURLModal = ({ handleClose, createShortenLink }) => {
  const [errors, setErrors] = useState({
    name: "",
    longURL: "",
  });

  const [form, setForm] = useState({
    name: "",
    longURL: "",
  });

  const handleSubmit = () => {
    const newErrors = {};
    const tName = form.name.trim();
    const tLongURL = form.longURL.trim();

    const urlRegex =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;

    if (tName.length < 3 || tName.length > 15) {
      newErrors.name = "The name should be min 3 and max 15 char long";
    }

    if (!urlRegex.test(tLongURL)) {
      newErrors.longURL = "URL is not valid";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    createShortenLink(tName, tLongURL);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-lg shadow-xl animate-modal-in">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Create Short URL
            </h2>

            <button
              onClick={handleClose}
              className="p-2 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full bg-gray-100 px-4 py-3 border-b outline-none
                  ${errors.name ? "border-red-500" : "border-gray-400"}
                  focus:border-primary`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="longURL"
                placeholder="Long URL"
                value={form.longURL}
                onChange={handleChange}
                className={`w-full bg-gray-100 px-4 py-3 border-b outline-none
                  ${errors.longURL ? "border-red-500" : "border-gray-400"}
                  focus:border-primary`}
              />
              {errors.longURL && (
                <p className="text-red-500 text-sm mt-1">{errors.longURL}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-4">
            <button
              onClick={handleSubmit}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 font-medium rounded-none"
            >
              Shorten URL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortenURLModal;
