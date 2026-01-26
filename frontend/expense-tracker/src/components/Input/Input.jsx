import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            px-4
            py-2
            pr-10
            bg-slate-100
            border
            border-slate-300
            rounded-md
            text-sm
            outline-none
            focus:border-primary
            focus:bg-white
          "
        />

        {isPassword && (
          <span
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              cursor-pointer
              text-slate-500
              hover:text-primary
            "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
