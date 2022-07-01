import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import PlaceBetForm from 'src/features/app/components/pages/member/mk/Sessions/PlaceBetForm'

export default function MemMkPlaceBet() {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>MK - Place Bet</title>
        </Head>
        <PlaceBetForm />
      </LayoutDash>
    </ProtectRoute>
  );
};