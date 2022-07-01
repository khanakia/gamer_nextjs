import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import Form1 from 'src/features/app/components/pages/admin/mk/Sessions/UnDeclareSessionBtn'

export default function AdminMkSessionDeclarePage() {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>MK - Declare Session</title>
        </Head>
        <Form1 />
      </LayoutDash>
    </ProtectRoute>
  );
};