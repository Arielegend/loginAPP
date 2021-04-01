import axios from "axios";
import { UserAuthParams, User } from "./Types";

const authUrl =
  "https://private-052d6-testapi4528.apiary-mock.com/authenticate";

const infoUrl = "https://private-052d6-testapi4528.apiary-mock.com/info";

/*
This function creates GET request, with given token, to fetch user's projects
Returns ->
  User's projects
*/
export async function getDataByToken(token: string) {
  const response = await axios.get(infoUrl, {
    headers: { Authorization: `Berear ${token}` },
  });

  if (response.status === 201) return response.data;
  return [];
}

/*
This function creates POST request, with given email & password
Returns -> 
  Validated user
*/
export async function loginAuth(email: string, password: string) {
  const userParams: UserAuthParams = { email, password };
  const response = await axios.post(authUrl, userParams);

  const user: User | undefined = response.data[0];

  return user;
}
