import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
     getAuth,
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyADTPJ-T0Z2sBkmPrOw3fdVIsD6wleizlo",
  authDomain: "netflix-clone-a14e4.firebaseapp.com",
  projectId: "netflix-clone-a14e4",
  storageBucket: "netflix-clone-a14e4.firebasestorage.app",
  messagingSenderId: "950548433059",
  appId: "1:950548433059:web:4937ef23e18cec1d989716"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));;
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));;
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};