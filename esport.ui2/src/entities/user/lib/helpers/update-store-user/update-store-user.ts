import { ApiContext, StateSchemaStore } from "@/shared/types";
import { userActions } from "../../../model/slices/userSlice";
import { IUser } from "../../../model/types/user";
import { UserRole } from "@/shared/constants";

export const updateStoreUser = async (
  ctx: ApiContext,
  store: StateSchemaStore
) => {
  const { dispatch, getState } = store;
  const { user } = getState();
  if (!user.data) {
    try {
      // const { data } = await AuthService(ctx).getUser();
      // const roles = getRoleArr(data.role);
      const data: IUser = {
        id: 1,
        name: "test",
        email: "",
        roles: [
          UserRole.OrganisationAdmin,
          UserRole.GymAdmin,
          UserRole.Trainee,
          UserRole.Trainer,
        ],
      };
      const roles = data.roles;
      // console.log("===data, roles===", data, roles);
      dispatch(userActions.setUser({ ...data, id: Number(data.id), roles }));
    } catch (e: any) {
      // console.log("===e===", e);
    }
  }
};
