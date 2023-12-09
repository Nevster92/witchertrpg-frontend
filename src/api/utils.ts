import { checkToken } from "./userAPI";
import { PASSWORD_MAX_CHARACTER } from "@/storeconstant";

export async function isValideToken() {
  let token = localStorage.getItem("cookie");
  let tok = await checkToken(token);
  console.log("utils:");
  console.log(tok);

  if (tok == true) {
    return true;
  } else {
    return false;
  }
}
