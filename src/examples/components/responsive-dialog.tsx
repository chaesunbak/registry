"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/registry/default/components/responsive-dialog";

export function ResponsiveDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>프로필 수정하기</Button>
      <ResponsiveDialog
        isOpen={open}
        setIsOpen={setOpen}
        title="프로필 수정하기"
        description="프로필 정보를 수정하고 저장하세요."
      >
        <div className="flex flex-col gap-4">
          <Input placeholder="이름" />
          <Input placeholder="이메일" />
          <Button>저장</Button>
        </div>
      </ResponsiveDialog>
    </>
  );
}
