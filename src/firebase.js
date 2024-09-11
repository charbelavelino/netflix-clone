import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAKseJ-0CHcFmp9i2h_4fxJWXjHAohKJFs",
  authDomain: "netflix-clone-a83ce.firebaseapp.com",
  projectId: "netflix-clone-a83ce",
  storageBucket: "netflix-clone-a83ce.appspot.com",
  messagingSenderId: "919910453065",
  appId: "1:919910453065:web:12d6941f57684a7d1c1498"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Basic email format validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, signup, login, logout };
