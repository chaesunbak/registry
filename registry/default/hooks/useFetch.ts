import {
  useState,
  useEffect,
  useCallback,
  useEffectEvent,
  useRef,
} from "react";

export function useFetch<T>({
  input,
  init,
  options,
}: {
  /** 패치할 대상 URL 또는 RequestInfo 객체 */
  input: RequestInfo | URL;
  /** fetch API의 옵션 (headers, method, body 등) */
  init?: RequestInit;
  /** 훅의 동작을 제어하기 위한 추가 옵션 */
  options?: {
    /** 패치 실행 여부 (false일 경우 수동으로 refetch를 호출해야 함) */
    enabled?: boolean;
    /** 데이터 패치 성공 시 호출되는 콜백 */
    onSuccess?: (data: T) => void;
    /** 데이터 패치 실패 시 호출되는 콜백 */
    onError?: (error: Error) => void;
  };
}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { onSuccess, onError, enabled = true } = options ?? {};

  // 콜백 함수들은 useEffectEvent(useEventCallback)를 사용하여 최신 상태 참조 및 무한 렌더링 방지
  // react 19 이전 버전 사용시 useRef 사용하여 메모이제이션 권장
  const onFetchSuccess = useEffectEvent((result: T) => onSuccess?.(result));
  const onFetchError = useEffectEvent((err: Error) => onError?.(err));

  const abortControllerRef = useRef<AbortController | null>(null);

  const inputStr = typeof input === "string" ? input : input.toString();

  const initStr = JSON.stringify(init);

  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(inputStr, {
        ...init,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      onFetchSuccess(result);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      const errorObj =
        err instanceof Error ? err : new Error("An unknown error occurred");
      setError(errorObj);
      onFetchError(errorObj);
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
      }
    }
  }, [inputStr, initStr]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled) return;

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData, enabled]);

  return { data, error, isError: !!error, isLoading, refetch };
}
