// pages/index.tsx
import { useState, useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { useRouter } from 'next/router';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';

// generate your data client using the Schema from your backend
/* with backend 
const client = generateClient<Schema>();

export default function NavHome() {
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
export default function NavHome() {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const items: MenuItem[] = [
    { label: '首页', icon: 'pi pi-home', url: '/' },
    {
      label: '营销', items: [
        { label: '内容', icon: 'pi pi-book', url: '/content', },
        { label: '策略', icon: 'pi pi-box', url: '/strategy', },
        { label: '受众', icon: 'pi pi-envelope', url: '/audience', },
      ]
    },
    {
      label: '数据', items: [
        { label: '客户', icon: 'pi pi-user', url: '/customer', },
        { label: '客户群', icon: 'pi pi-users', url: '/group', },
        { label: '标签', icon: 'pi pi-tag', url: '/tag', }
      ]
    },];

  return (
    //PrimeBlocks. Sidebar Layouts. Grouped Menu
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu model={items} />
    </div>
  )
}