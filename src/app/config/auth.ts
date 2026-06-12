import { FirebaseError } from 'firebase/app';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import { errorNotifyMessage, successNotifyMessage, warningNotifyMessage } from '@/common/utils/notifyMessage.ts';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const { user } = res;
        if (!res || !user) {
            throw new Error('Google sign in failed');
        }
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
        successNotifyMessage('Successful login via Google account');
    } catch (err) {
        if (err instanceof Error) {
            errorNotifyMessage({ message: err.message });
        } else {
            errorNotifyMessage({ message: 'An unknown error occurred' });
        }
    }
};

export const signUpUser = async (name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = res;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
        successNotifyMessage('Successful sign up');
    } catch (err) {
        if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
            warningNotifyMessage('An account with the same email already exists');
        } else if (err instanceof Error) {
            errorNotifyMessage({ message: err.message });
        } else {
            errorNotifyMessage({ message: 'Registration failed, please try again later' });
        }
    }
};

export const signInUser = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        successNotifyMessage('Successful sign in');
    } catch (err) {
        if (err instanceof FirebaseError && err.code === 'auth/invalid-credential') {
            warningNotifyMessage('Invalid email or password, please try again');
        } else if (err instanceof Error) {
            errorNotifyMessage({ message: err.message });
        } else {
            errorNotifyMessage({ message: 'An unknown error occurred' });
        }
    }
};

export const signOutUser = async (extraMsg?: string) => {
    try {
        await signOut(auth);
        if (extraMsg) {
            warningNotifyMessage(extraMsg);
        } else {
            warningNotifyMessage('You signed out. See you soon!');
        }
    } catch (err) {
        if (err instanceof Error) {
            errorNotifyMessage({ message: err.message });
        } else {
            errorNotifyMessage({ message: 'An unknown error occurred' });
        }
    }
};
