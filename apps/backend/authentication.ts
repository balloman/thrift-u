import { eq } from "drizzle-orm";
import * as jose from "jose";
import { db } from "./db";
import { users, type User } from "./schema";

const CLIENT_ID = "host.exp.Exponent";
const url = new URL("https://appleid.apple.com/auth/keys");
// @ts-expect-error - TypeScript doesn't know about the createRemoteJWKSet function
const JWKS = jose.createRemoteJWKSet(url);

export async function deserializeToken(token: string) {
  console.log("Deserializing token", token);
  const claims = await jose.jwtVerify(token, JWKS, {
    issuer: "https://appleid.apple.com",
    audience: CLIENT_ID,
  });
  return claims;
}

export async function getUserByAppleId(appleId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.appleId, appleId),
  });
  return user;
}

export async function createUser({
  name,
  appleId,
}: { name: string; appleId: string }) {
  const user = await db
    .insert(users)
    .values({ name: name, appleId: appleId })
    .returning();
  return user[0];
}

export async function getUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  return user;
}

export async function updateProfile(params: Omit<User, "appleId">) {
  const user = await db
    .update(users)
    .set({ name: params.name, profilePictureUrl: params.profilePictureUrl })
    .where(eq(users.id, params.id))
    .returning();
  return user[0];
}
