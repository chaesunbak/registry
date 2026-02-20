"use client";

import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";

export function UseDialogAlertExample() {
  const { alert } = useDialog();

  return (
    <Button
      onClick={() => {
        alert("알려드릴게요", "작업이 완료됐어요.", undefined, {
          confirmText: "확인하기",
          closeOnDimmerClick: false,
        });
      }}
    >
      기본 Alert 다이얼로그 열기
    </Button>
  );
}
