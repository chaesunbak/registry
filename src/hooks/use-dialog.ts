import { create } from "zustand";
import { ReactNode } from "react";

interface DialogOptions {
  cancelText?: string;
  confirmText?: string;
  isDestructive?: boolean;
  closeOnDimmerClick?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

interface DialogState {
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  description: string;
  content: ReactNode | null;
  cancelText: string;
  confirmText: string;
  isDestructive: boolean;
  closeOnDimmerClick: boolean;
  hasCancel: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
}

interface DialogActions {
  confirm: (
    title: string,
    description?: string,
    content?: ReactNode | null,
    options?: DialogOptions,
  ) => Promise<boolean>;
  alert: (
    title: string,
    description?: string,
    content?: ReactNode | null,
    options?: Omit<DialogOptions, "cancelText" | "onCancel">,
  ) => Promise<boolean>;
  setLoading: (isLoading: boolean) => void;
  close: () => void;
}

type DialogStore = DialogState & DialogActions;

const INITIAL_STATE: DialogState = {
  isOpen: false,
  isLoading: false,
  title: "",
  description: "",
  content: null,
  cancelText: "취소",
  confirmText: "확인",
  isDestructive: false,
  closeOnDimmerClick: true,
  hasCancel: true,
  onConfirm: () => {},
  onCancel: () => {},
};

export const useDialogStore = create<DialogStore>((set, get) => ({
  ...INITIAL_STATE,

  setLoading: (isLoading) => set({ isLoading }),
  close: () => {
    const { onCancel, isOpen } = get();
    if (isOpen) {
      onCancel();
    }
    set({ isOpen: false, isLoading: false });
  },

  confirm: (title, description = "", content = null, options) => {
    return new Promise((resolve) => {
      const cancelText = options?.cancelText ?? INITIAL_STATE.cancelText;
      const confirmText = options?.confirmText ?? INITIAL_STATE.confirmText;
      const isDestructive =
        options?.isDestructive ?? INITIAL_STATE.isDestructive;
      const closeOnDimmerClick =
        options?.closeOnDimmerClick ?? INITIAL_STATE.closeOnDimmerClick;

      const onConfirmAction = options?.onConfirm;
      const onCancelAction = options?.onCancel;

      set({
        isOpen: true,
        isLoading: false,
        title,
        description,
        content,
        cancelText,
        confirmText,
        isDestructive,
        closeOnDimmerClick,
        hasCancel: true,
        onConfirm: async () => {
          if (onConfirmAction) {
            set({ isLoading: true });
            try {
              await onConfirmAction();
            } finally {
              set({ isOpen: false, isLoading: false });
              resolve(true);
            }
          } else {
            set({ isOpen: false });
            resolve(true);
          }
        },
        onCancel: async () => {
          if (onCancelAction) {
            set({ isLoading: true });
            try {
              await onCancelAction();
            } finally {
              set({ isOpen: false, isLoading: false });
              resolve(false);
            }
          } else {
            set({ isOpen: false });
            resolve(false);
          }
        },
      });
    });
  },

  alert: (title, description = "", content = null, options) => {
    return new Promise((resolve) => {
      const confirmText = options?.confirmText ?? INITIAL_STATE.confirmText;
      const isDestructive =
        options?.isDestructive ?? INITIAL_STATE.isDestructive;
      const closeOnDimmerClick =
        options?.closeOnDimmerClick ?? INITIAL_STATE.closeOnDimmerClick;

      const onConfirmAction = options?.onConfirm;

      set({
        isOpen: true,
        isLoading: false,
        title,
        description,
        content,
        cancelText: INITIAL_STATE.cancelText,
        confirmText,
        isDestructive,
        closeOnDimmerClick,
        hasCancel: false,
        onConfirm: async () => {
          if (onConfirmAction) {
            set({ isLoading: true });
            try {
              await onConfirmAction();
            } finally {
              set({ isOpen: false, isLoading: false });
              resolve(true);
            }
          } else {
            set({ isOpen: false });
            resolve(true);
          }
        },
        onCancel: () => {
          set({ isOpen: false });
          resolve(false);
        },
      });
    });
  },
}));

export const useDialog = () => {
  const confirm = useDialogStore((state) => state.confirm);
  const alert = useDialogStore((state) => state.alert);

  return { confirm, alert };
};
