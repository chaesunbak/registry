import { useState, useEffect, useCallback } from "react";

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

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(input, {
          ...init,
          signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        onSuccess?.(result);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        const errorObj =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(errorObj);
        onError?.(errorObj);
      } finally {
        setIsLoading(false);
      }
    },
    [input, init, onSuccess, onError],
  );

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData, enabled]);

  return { data, error, isError: !!error, isLoading, refetch };
}
