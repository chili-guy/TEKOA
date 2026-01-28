import { useCallback, useEffect, useState } from "react";
import { Appointment, getAppointments } from "../api";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    return getAppointments()
      .then((list) => {
        setAppointments(list);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Erro inesperado.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { appointments, loading, error, refresh };
};
