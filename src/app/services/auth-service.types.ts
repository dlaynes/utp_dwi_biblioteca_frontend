import { RolKey } from "../domain/rol";

export type LoginResponse = {
    token: string;
    tokenType: string;
    rolKeys: RolKey[];
};
