import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/admin/mk/Sessions'

export default function AdminMkSessionPage() {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Mk - Sessions</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRoute>
  );
};

