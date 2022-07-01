import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import Create from 'src/features/app/components/pages/Users/Create'

const UserCreate = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>User</title>
        </Head>
        <Create />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default UserCreate