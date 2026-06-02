"use client";

import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import { getStoredUser, USER_KEY } from "@/lib/auth";
import clsx from "clsx";

type ProfileAvatarProps = {
  size?: number;
  /** readonly: display only (safe inside links). editable: upload controls in sidebar/profile */
  variant?: "readonly" | "editable";
  className?: string;
};

export default function ProfileAvatar({
  size = 44,
  variant = "editable",
  className,
}: ProfileAvatarProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [initials, setInitials] = useState("U");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editable = variant === "editable";

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
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      setAvatar(data);
      try {
        const user = getStoredUser() || {};
        const updated = { ...user, avatar: data };
        window.localStorage.setItem(USER_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("cil_user_update"));
      } catch {
        /* ignore */
      }
    };
    reader.readAsDataURL(file);
  };

  const face = avatar ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={avatar} alt="" style={{ width: size, height: size, objectFit: "cover" }} />
  ) : (
    <div
      className="flex items-center justify-center text-sm font-bold text-primary-900"
      style={{ width: size, height: size }}
    >
      {initials || <FaUserCircle size={size * 0.6} />}
    </div>
  );

  return (
    <div className={clsx("relative inline-flex items-center justify-center", className)}>
      {editable ? (
        <button
          type="button"
          onClick={openFile}
          className="flex items-center justify-center rounded-full bg-accent-100 text-accent-700 overflow-hidden hover:ring-2 hover:ring-accent-400/50 transition"
          style={{ width: size, height: size }}
          title="Upload profile picture"
        >
          {face}
        </button>
      ) : (
        <div
          className="flex items-center justify-center rounded-full bg-accent-100 text-accent-700 overflow-hidden"
          style={{ width: size, height: size }}
        >
          {face}
        </div>
      )}

      {editable ? (
        <button
          type="button"
          onClick={openFile}
          className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary-900 shadow-md border border-slate-200"
          title="Change photo"
        >
          <FaUpload className="text-xs" />
        </button>
      ) : null}

      {editable ? (
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      ) : null}
    </div>
  );
}
