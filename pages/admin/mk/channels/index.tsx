import Head from "next/head";
import Layout from "src/features/app/components/layout/LayoutAdmin";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/admin/mk/Channels'

export default function AdminMkSessionPage() {
  return (
    <ProtectRoute>
      <Layout>
        <Head>
          <title>Mk - Channels</title>
        </Head>
        <List />
      </Layout>
    </ProtectRoute>
  );
};

