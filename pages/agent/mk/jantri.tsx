import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import Jantri from 'src/features/app/components/pages/agent/mk/Jantri/JantriPage'

export default function AgentJantriPage() {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>MK - Jantri Session</title>
        </Head>
        <Jantri />
      </LayoutDash>
    </ProtectRoute>
  );
};