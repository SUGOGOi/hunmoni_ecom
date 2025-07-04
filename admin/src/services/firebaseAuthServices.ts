import axios from "axios";
import { auth, provider } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

export const registerWithEmail = async (
  email: string,
  password: string,
  name: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name });
  }

  const idToken = await auth.currentUser?.getIdToken();

  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/auth/register`,
    {
      idToken,
      name,
    },
    {
      withCredentials: true,
    }
  );

  if (response.data.success !== true) throw new Error("Login failed");

  return userCredential.user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const idToken = await auth.currentUser?.getIdToken();
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/auth/login`,
    {
      idToken,
    },
    {
      withCredentials: true,
    }
  );

  if (response.data.success !== true) throw new Error("Login failed");

  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  const idToken = await auth.currentUser?.getIdToken();

  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/auth/login`,
    {
      idToken,
    },
    {
      withCredentials: true,
    }
  );

  if (response.data.success !== true) throw new Error("Login failed");

  return result.user;
};

export const logout = async () => {
  await logout();
};
