import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

// Custom hook to read  auth record and user profile doc
const useUserData = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = onSnapshot(doc(db, "users", `${user?.uid}`), doc => {
        setUserData(doc.data()?.basicInfo);
      });
    } else {
      setUserData(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, userData };
};

export default useUserData;
