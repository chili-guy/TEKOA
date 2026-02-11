import { useEffect, useState } from "react";
import { getCurrentUser, MeResponse } from "../api";

const STORAGE_KEY = "account-settings";

type AccountSettingsOverride = {
  fullName?: string;
  email?: string;
};

const readOverrides = (): AccountSettingsOverride | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }
  try {
    const parsed = JSON.parse(stored) as AccountSettingsOverride;
    return parsed;
  } catch {
    return null;
  }
};

export const useCurrentUser = () => {
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<AccountSettingsOverride | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getCurrentUser()
      .then((response) => {
        if (isMounted) {
          setData(response);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Erro inesperado.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const refreshOverrides = () => {
      setOverrides(readOverrides());
    };
    refreshOverrides();
    window.addEventListener("storage", refreshOverrides);
    window.addEventListener("account-settings-updated", refreshOverrides);
    return () => {
      window.removeEventListener("storage", refreshOverrides);
      window.removeEventListener("account-settings-updated", refreshOverrides);
    };
  }, []);

  const mergedData = data
    ? {
        ...data,
        user: {
          ...data.user,
          name: overrides?.fullName ?? data.user?.name,
          email: overrides?.email ?? data.user?.email,
        },
      }
    : data;

  return { data: mergedData, loading, error };
};
