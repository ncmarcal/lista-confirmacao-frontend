import { RoleEnum } from "../../shared/enums/role-enum";

export class CadastroModel {
  username: string | undefined | null;
  password?: string;
  role?: RoleEnum;
  presence?: boolean;
}
