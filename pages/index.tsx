// pages/index.tsx
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function HomePage() {
  const [tenants, setTenants] = useState<Schema['Tenant'][]>([]);

  async function listTodos() {
    // fetch all todos
    const { data } = await client.models.Tenant.list();
    setTenants(data);
  }

  useEffect(() => {
    const sub = client.models.Tenant.observeQuery().subscribe(({ items }) =>
     setTenants([...items])
    );
  
    return () => sub.unsubscribe();
  }, []);

  // pages/index.tsx
// ...
return (
  <main>
    <h1>Hello, Amplify 👋</h1>

    <ul>
      {tenants.map((tenant) => (
        <li key={tenant.id}>{tenant.tenant_name}</li>
      ))}
    </ul>
  </main>
);
}