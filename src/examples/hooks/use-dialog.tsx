"use client";

import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UseDialogExample() {
  const { confirm, alert } = useDialog();

  const delay = async (ms: number) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleAsyncConfirm = async () => {
    await confirm(
      "작업을 진행할까요?",
      "이 작업은 되돌릴 수 없습니다.",
      <Input placeholder="계정 삭제 사유를 입력해주세요." />,
      {
        isDestructive: true,
        onConfirm: async () => {
          await delay(1000); // 1초 대기 (로딩 상태 자동 반영)
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button onClick={handleAsyncConfirm} variant="default">
        계정 삭제하기
      </Button>
    </div>
  );
}
