import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

export const ExerciseApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    async createExercise(formData: FormData) {
      return instance.post("/trainer-new-exercise", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  };
};