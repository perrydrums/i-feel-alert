import React from "react";

import { User as UserType } from "../../helpers/types";

export const UserContext = React.createContext<UserType | null>(null);
export const useUserContext = () => React.useContext(UserContext);
