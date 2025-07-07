import axios from "axios";
import { auth, provider } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

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

  const user = auth.currentUser;
  const idToken = await user?.getIdToken();

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

// type FirebaseAuthError = {
//   code: string;
//   message?: string;
// };

export const loginWithEmail = async (email: string, password: string) => {
  let userCredential;
  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    // console.error(error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code: unknown }).code === "string"
    ) {
      const firebaseError = error as { code: string; message?: string };

      if (firebaseError.code === "auth/invalid-credential") {
        toast.error("Invalid credential");
      } else {
        toast(`${firebaseError.message} || Unknown error`, {
          // icon: "✔",
          style: {
            borderRadius: "13px",
            background: "#3e1220",
            color: "#ca2d44",
          },
        });
      }
    } else {
      toast("Login failed due to an unknown error", {
        style: {
          borderRadius: "13px",
          background: "#3e1220",
          color: "#ca2d44",
        },
      });
    }

    throw new Error("Login failed");
  }

  const user = auth.currentUser;
  const idToken = await user?.getIdToken();
  const refreshToken = user?.refreshToken;
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/auth/login`,
    {
      accessToken: idToken,
      refreshToken,
    },
    {
      withCredentials: true,
    }
  );

  if (response.data.success !== true) throw new Error("Login failed");

  return userCredential.user;
};

export const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);

  const user = auth.currentUser;
  const idToken = await user?.getIdToken();
  const refreshToken = user?.refreshToken;

  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/auth/login`,
    {
      accessToken: idToken,
      refreshToken,
    },
    {
      withCredentials: true,
    }
  );

  if (response.data.success !== true) {
    throw new Error(`${response.data.error}`);
  }

  const messageFinal = response.data.message;

  return { message: messageFinal };
};

export const logout = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  if (response.data.success === true) {
    await auth.signOut();
  }
  return response;
};
