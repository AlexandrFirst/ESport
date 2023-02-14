import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { routes } from "routes";

import { useQueryFnWithLoader } from "@shared/lib/hooks/useQueryFnWithLoader";

import { competitionApi, ICreateCompetitionForm } from "@entities/competition";
import { useSnackbar } from "@features/SportSnackbar";

export const createCompetitionMutationKey = {
  all: ["competitions", "create-competition"] as const,
};

export const useCreateCompetitionMutation = () => {
  const router = useRouter();
  const withErrorAndLoading = useQueryFnWithLoader({ isShowLoading: false });
  const { success } = useSnackbar();

  return useMutation({
    mutationKey: createCompetitionMutationKey.all,
    mutationFn: async (data: ICreateCompetitionForm) =>
      withErrorAndLoading(competitionApi.create, {
        ...data,
        organizationId: 1,
        categories: [],
      }),
    onSuccess: ({ id }) => {
      success("Competition created successfully");
      router.push(routes.Competition.Id(id));
    },
  });
};
