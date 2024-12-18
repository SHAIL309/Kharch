import { Api } from "./Api";

export class UserService extends Api<any> {
  constructor() {
    super("auth");
  }

  getCurrentUser = async () => {
    return this.get("current-user");
  };
}
