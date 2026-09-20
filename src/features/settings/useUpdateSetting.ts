import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSetting,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["settings"],
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateSetting, error, isPending };
}
