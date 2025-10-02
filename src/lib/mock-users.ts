import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  image?: string;
};

declare global {
  var _mockUsers: MockUser[] | undefined;
}
const store: MockUser[] = global._mockUsers ?? (global._mockUsers = []);

export function getUserByEmail(email: string): MockUser | undefined {
  return store.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(params: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const { firstName, lastName, email, password } = params;
  if (getUserByEmail(email)) throw new Error("Bu e-posta zaten kayıtlı");
  const passwordHash = await bcrypt.hash(password, 10);
  const user: MockUser = {
    id: randomUUID(),
    name: `${firstName} ${lastName}`.trim(),
    email,
    passwordHash,
    image: "/images/default-avatar.png",
  };
  store.push(user);
  return user;
}

export async function verifyUser(email: string, password: string) {
  const user = getUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}
