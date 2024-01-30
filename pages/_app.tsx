import config from '@/amplifyconfiguration.json';
import React from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { AppProps } from "next/app";

Amplify.configure(config);

/* with authenticator 
export default function App() {
  return (
    <Authenticator 
    initialState='signUp'
    //signUpAttributes={['name','nickname','preferred_username']}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}*/

/* no authenticator */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

