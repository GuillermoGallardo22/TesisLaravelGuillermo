import { IUser } from "models/interfaces";

export enum AuthActionsEnum {
  setCheckingAuth,
  setIsAuth,
  setUser,
}

export interface AuthReducerState {
  user: IUser;
  isAuth: boolean;
  checkingAuth: boolean;
}

export interface AuthActionsProps {
  type: AuthActionsEnum;
  payload: IUser | boolean;
}

export function authReducer(
  state: AuthReducerState,
  actions: AuthActionsProps
): AuthReducerState {
  const { payload, type } = actions;

  switch (type) {
  case AuthActionsEnum.setIsAuth:
    return {
      ...state,
      isAuth: payload as boolean,
    };
  case AuthActionsEnum.setCheckingAuth:
    return {
      ...state,
      checkingAuth: payload as boolean,
    };
  case AuthActionsEnum.setUser:
    return {
      ...state,
      user: payload as IUser,
    };
  default:
    return state;
  }
}
