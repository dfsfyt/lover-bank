"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: signInProps) => {
  try {
    debugger
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
    return parseStringify(session);
  } catch (error) {
    console.log(error);
  }
};
export const signUp = async (userData: SignUpParams) => {
  try {
    const {email, password, firstName, lastName, address1, city, state, postalCode, dateOfBirth, ssn} = userData;
    const { account, database } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    database.createDocument(
      process.env.APPWRITE_DATABASE_ID || '',
      process.env.APPWRITE_USER_COLLECTION_ID || '',
      ID.unique(),
      {
        email, firstName, lastName, address1, city, state, postalCode, dateOfBirth, ssn,
        userId: newUserAccount.$id
      }
    )
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log(error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session');
        await account.deleteSession('current')
    } catch (error) {
        console.log(error);
        return null;
    }
}
