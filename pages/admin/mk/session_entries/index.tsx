import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/agent/mk/SessionEntries'

export default function AgentMkSessionEntriesPage() {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Mk - Session Entriess</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRoute>
  );
};

