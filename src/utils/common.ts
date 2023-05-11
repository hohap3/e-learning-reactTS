import { ToastType } from "./../constants/toast";
import { toast } from "react-toastify";

import { CommonStyleToast, ImageDefaultSize } from "../models";

export function saveLocalStorage(name: string, value: unknown): void {
  localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalStorageData(name: string): any {
  return JSON.parse(`${localStorage.getItem(name)}`);
}

export function getDefaultImagePath({
  width,
  height,
}: ImageDefaultSize): string {
  return `https://placehold.co/${width}x${height}?text=THUMBNAIL`;
}

export function toastMessage(message: string, type: string) {
  const commonStyle: CommonStyleToast = {
    position: "top-right",
    autoClose: 1800,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const { INFO, WARNING, ERROR, SUCCESS } = ToastType;

  switch (type) {
    case INFO:
      return () => toast.info(message, commonStyle);
    case SUCCESS:
      return () => toast.success(message, commonStyle);
    case ERROR:
      return () => toast.error(message, commonStyle);
    case WARNING:
      return () => toast.warn(message, commonStyle);

    default:
      return () => toast(message, commonStyle);
  }
}

export function limitWordLength(word: string, length: number): string {
  if (!word) return "";
  if (word.length <= length) return word;
  return `${word.slice(0, length)}…`;
}
