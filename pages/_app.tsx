import config from '@/amplifyconfiguration.json';
import React from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import type { AppProps } from "next/app";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';


Amplify.configure(config);

/* with authenticator 
export default function App() {
  return (
    <Authenticator 
    initialState='signUp'
    //signUpAttributes={['nickname','preferred_username']}
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

