"use client";

import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import { getStoredUser, USER_KEY } from "@/lib/auth";

export default function ProfileAvatar({ size = 44 }: { size?: number }) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("U");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      if (user.avatar) setAvatar(user.avatar);
      const first = user.firstName || "";
      const last = user.lastName || "";
      const derived = `${(first[0] || "").toUpperCase()}${(last[0] || "").toUpperCase()}`;
      if (derived.trim()) setInitials(derived);
    }

    const onUpdate = () => {
      const u = getStoredUser();
      if (u?.avatar) setAvatar(u.avatar);
    };

    window.addEventListener("cil_user_update", onUpdate as EventListener);
    return () => window.removeEventListener("cil_user_update", onUpdate as EventListener);
  }, []);

  const openFile = () => inputRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please upload an image file.");
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      setAvatar(data);
      try {
        const user = getStoredUser() || {};
        const updated = { ...user, avatar: data };
        window.localStorage.setItem(USER_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("cil_user_update"));
      } catch (_) {}
    };
    reader.readAsDataURL(file);
  };

  const sizeClass = `${size}px`;

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        onClick={openFile}
        className="flex items-center justify-center rounded-full bg-accent-100 text-accent-700 cursor-pointer overflow-hidden"
        style={{ width: size, height: size }}
        title="Upload profile picture"
      >
        {avatar ? (
          // show avatar image
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="avatar" style={{ width: size, height: size, objectFit: "cover" }} />
        ) : (
          <div className="flex items-center justify-center text-sm font-bold text-primary-900" style={{ width: size, height: size }}>
            {initials || <FaUserCircle size={size * 0.6} />}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={openFile}
        className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary-900 shadow-md border border-slate-200"
        title="Change"
      >
        <FaUpload className="text-xs" />
      </button>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
