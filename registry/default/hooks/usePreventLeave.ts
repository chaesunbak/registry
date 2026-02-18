import { useEventListener } from "usehooks-ts";

/**
 * 페이지 이탈 방지 훅
 * @param isDirty - 변경 사항이 있어 차단할지 여부
 */
export function usePreventLeave(isDirty: boolean) {
  useEventListener("beforeunload", (event) => {
    if (isDirty) {
      event.preventDefault();
    }
  });
}
