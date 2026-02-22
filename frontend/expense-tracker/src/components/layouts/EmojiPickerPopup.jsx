import React from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative flex flex-col md:flex-row items-start gap-5 mb-6">
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <LuImage className="w-6 h-6 text-gray-500" />
          )}
        </div>
        <p className="text-sm text-gray-500">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-lg p-2">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm absolute top-2 right-2 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <LuX className="w-4 h-4" />
          </button>

          <EmojiPicker
            onEmojiClick={(emoji) => {
              onSelect(emoji.emoji);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
