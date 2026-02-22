import React from "react";

const DeleteAlert = ({ content, onConfirm, onCancel }) => {
  return (
    <div className="p-4">
      <p className="text-gray-700">{content}</p>

      <div className="flex justify-end gap-3 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
