// pages/index.tsx
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import { Button } from 'primereact/button';                             
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


// generate your data client using the Schema from your backend
/* with backend 
const client = generateClient<Schema>();

export default function HomePage() {
  const [tenants, setTenants] = useState<Schema['Tenant'][]>([]);

  async function listTodos() {
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
}*/

/* pure frontend */
export default function MyApp() {
  return (
      <PrimeReactProvider>
<div className="surface-0">
    <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
        <li>
            <a className="text-500 no-underline line-height-3 cursor-pointer">Application</a>
        </li>
        <li className="px-2">
            <i className="pi pi-angle-right text-500 line-height-3"></i>
        </li>
        <li>
            <span className="text-900 line-height-3">Analytics</span>
        </li>
    </ul>
    <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
        <div>
            <div className="font-medium text-3xl text-900">Customers</div>
            <div className="flex align-items-center text-700 flex-wrap">
                <div className="mr-5 flex align-items-center mt-3">
                    <i className="pi pi-users mr-2"></i>
                    <span>332 Active Users</span>
                </div>
                <div className="mr-5 flex align-items-center mt-3">
                    <i className="pi pi-globe mr-2"></i>
                    <span>9402 Sessions</span>
                </div>
                <div className="flex align-items-center mt-3">
                    <i className="pi pi-clock mr-2"></i>
                    <span>2.32m Avg. Duration</span>
                </div>
            </div>
        </div>
        <div className="mt-3 lg:mt-0">
        <Button label="Add" className="p-button-outlined mr-2" icon="pi pi-user-plus" />
            <Button label="Save" icon="pi pi-check" />
        </div>
    </div>
</div>
</PrimeReactProvider>
);
}