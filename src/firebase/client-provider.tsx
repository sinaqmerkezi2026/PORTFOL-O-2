
'use client';

import React, { useMemo } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

export function FirebaseClientProvider({
  children,
  firebaseApp: propApp,
  firestore: propFirestore,
  auth: propAuth,
}: {
  children: React.ReactNode;
  firebaseApp?: FirebaseApp;
  firestore?: Firestore;
  auth?: Auth;
}) {
  // Initialize Firebase on the client if instances aren't provided as props
  // This prevents serialization errors when the layout is a Server Component
  const { firebaseApp, firestore, auth } = useMemo(() => {
    if (propApp && propFirestore && propAuth) {
      return { firebaseApp: propApp, firestore: propFirestore, auth: propAuth };
    }
    return initializeFirebase();
  }, [propApp, propFirestore, propAuth]);

  return (
    <FirebaseProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
      {children}
    </FirebaseProvider>
  );
}
