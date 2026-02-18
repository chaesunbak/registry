"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { usePreventLeave } from "@/registry/default/hooks/usePreventLeave";

export function UsePreventLeaveExample() {
  const [title, setTitle] = useState("");

  const isDirty = title.length > 0;

  usePreventLeave(isDirty);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        입력 중인 내용이 있을 때 탭을 닫거나 새로고침하면 브라우저의 이탈 경고가
        뜹니다.
      </p>
      <div className="space-y-2">
        <Input
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
    </div>
  );
}
