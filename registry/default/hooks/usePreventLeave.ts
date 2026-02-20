import { useEventListener } from "usehooks-ts";

/**
 * 페이지 이탈 방지 훅
 * @param prevent - 페이지 이탈 방지 여부
 */
export function usePreventLeave(prevent: boolean = true) {
  useEventListener("beforeunload", (event) => {
    if (prevent) {
      event.preventDefault();
    }
  });
}
