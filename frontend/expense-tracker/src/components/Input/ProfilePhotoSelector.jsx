import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <LuUser className="text-slate-400 text-3xl" />
        )}

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="flex gap-3 mt-4">
        {/* Upload Icon */}
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          <LuUpload size={16} />
        </button>

        {/* Delete Icon */}
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            <LuTrash size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
