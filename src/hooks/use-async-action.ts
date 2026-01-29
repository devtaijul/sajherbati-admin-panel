"use client";

import { useCallback, useState, useTransition } from "react";

import toast from "react-hot-toast";
import { useMounted } from "./use-mounted";
import { ActionError, ActionErrorOrSuccess } from "../utils/server";

interface AsyncActionOptions<TData> {
  onSuccess?: (data: TData) => void | Promise<void>;
  onError?: (message: string, error?: Error) => void | Promise<void>;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A hook for handling async operations with loading states and toast notifications.
 *
 * @example
 * ```tsx
 * const { runAction, isProcessing } = useAsyncAction<User, [FormData]>(
 *   createUser,
 *   { successMessage: 'User created', onSuccess: () => closeModal(); }
 * );
 * await runAction(formData);
 * ```
 */
export function useAsyncAction<
  TData extends ActionErrorOrSuccess<unknown>,
  TArgs extends unknown[] = [],
>(
  action: (...args: TArgs) => Promise<TData>,
  options?: AsyncActionOptions<TData>,
) {
  const isMounted = useMounted();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const runAction = useCallback(
    async (...args: TArgs): Promise<void> => {
      if (!isMounted()) return;

      startTransition(() => setIsLoading(true));

      try {
        const response = await action(...args);

        if (!isMounted()) return;

        if (response.success) {
          if (options?.successMessage ?? response.message) {
            toast.success(options?.successMessage ?? response.message);
          }
          await options?.onSuccess?.(response);
        } else {
          if (options?.errorMessage ?? response.message) {
            toast.error(options?.errorMessage ?? response.message);
          }
          await options?.onError?.(
            response.message,
            new ActionError(response.message),
          );
        }
      } catch (error) {
        if (!isMounted()) return;

        const normalizedError =
          error instanceof Error ? error : new Error(String(error));

        if (options?.errorMessage) {
          toast.error(options.errorMessage);
        }

        await options?.onError?.(normalizedError.message, normalizedError);
      } finally {
        if (isMounted()) {
          startTransition(() => setIsLoading(false));
        }
      }
    },
    [action, isMounted, options],
  );

  const isProcessing = isPending || isLoading;

  return {
    runAction,
    isProcessing,
  } as const;
}
