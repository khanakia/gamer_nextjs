import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/member/mk/Sessions'

export default function MemberMkSessionsPage() {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Mk - Play Sessions</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRoute>
  );
};

