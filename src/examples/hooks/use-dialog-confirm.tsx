"use client";

import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";

export function UseDialogConfirmExample() {
  const { confirm } = useDialog();

  return (
    <Button
      onClick={() => {
        confirm("삭제할까요?", "이 작업은 되돌릴 수 없어요.", undefined, {
          confirmText: "삭제하기",
          cancelText: "취소",
          isDestructive: true,
        });
      }}
    >
      기본 Confirm 다이얼로그 열기
    </Button>
  );
}
