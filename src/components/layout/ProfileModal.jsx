import { useEffect, useMemo, useState } from "react";
import Modal from "../ui/Modal";
import { useAppContext } from "../../context/AppContext";

/** Downscale + JPEG encode so base64 fits localStorage and loads stay fast. */
function imageFileToCompressedDataUrl(file, maxDim = 512, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height / width) * maxDim);
          width = maxDim;
        } else {
          width = Math.round((width / height) * maxDim);
          height = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

export default function ProfileModal({ open, onClose }) {
  const { state, dispatch } = useAppContext();
  const [name, setName] = useState(state.profile?.name || "");
  const [email, setEmail] = useState(state.profile?.email || "");
  const [avatar, setAvatar] = useState(state.profile?.avatar || null);

  useEffect(() => {
    if (!open) return;
    setName(state.profile?.name || "");
    setEmail(state.profile?.email || "");
    setAvatar(state.profile?.avatar ?? null);
  }, [open, state.profile?.name, state.profile?.email, state.profile?.avatar]);

  const initials = useMemo(
    () =>
      (name || state.profile?.name || "")
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join(""),
    [name, state.profile?.name]
  );

  const onSelectImage = async (event) => {
    const file = event.target.files?.[0];
    const input = event.target;
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    try {
      const dataUrl = await imageFileToCompressedDataUrl(file);
      setAvatar(dataUrl);
    } catch {
      /* ignore invalid images */
    } finally {
      input.value = "";
    }
  };

  const onSave = () => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        name: name.trim() || state.profile?.name || "User",
        email: email.trim() || state.profile?.email || "",
        avatar: avatar ?? null
      }
    });
    onClose();
  };

  return (
    <Modal isOpen={open} title="Edit Profile" onClose={onClose}>
      <div className="min-w-0 space-y-4">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="mx-auto shrink-0 sm:mx-0">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-slate-300 bg-indigo-500 text-white dark:border-slate-600">
              {avatar ? (
                <img src={avatar} alt="Profile preview" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-lg font-semibold">{initials || "U"}</div>
              )}
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2 sm:justify-start">
            <label className="inline-flex cursor-pointer shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600">
              Upload photo
              <input type="file" accept="image/*" onChange={onSelectImage} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => setAvatar(null)}
              className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600"
            >
              Remove
            </button>
          </div>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600"
        />

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600"
          >
            Cancel
          </button>
          <button type="button" onClick={onSave} className="rounded-lg bg-indigo-500 px-3 py-2 text-sm text-white">
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
