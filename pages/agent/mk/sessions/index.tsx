import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/agent/mk/Sessions'

export default function AgentMkSessionPage() {
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

