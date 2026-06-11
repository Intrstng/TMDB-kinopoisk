import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setUserAC } from '@/app/model/slices/app-slice.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { auth } from '@/app/config/firebase.ts';

export const useAuthInit = () => {
    const [user, loading] = useAuthState(auth);
    const dispatch = useAppDispatch();

    const serializableUser = user
        ? {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
          }
        : null;

    useEffect(() => {
        dispatch(setUserAC({ user: serializableUser }));
        // dispatch(setAppStatusAC({status: 'loading'}));
    }, [user, loading, dispatch]);
};
