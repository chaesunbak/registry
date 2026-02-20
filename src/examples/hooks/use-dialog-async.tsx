"use client";

import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";

export function UseDialogAsyncExample() {
  const { confirm } = useDialog();

  const delay = async (milliseconds: number) => {
    await new Promise((res) => setTimeout(res, milliseconds));
  };

  return (
    <Button
      onClick={() => {
        confirm(
          "상담을 종료할까요?",
          "상담을 종료하면 대화를 이어갈 수 없어요.",
          undefined,
          {
            confirmText: "종료하기",
            cancelText: "취소",
            onConfirm: () => delay(2000),
          },
        );
      }}
    >
      비동기 Confirm 다이얼로그 열기
    </Button>
  );
}
