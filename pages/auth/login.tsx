import type { NextPage } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoginFormOtp from 'src/components/auth/LoginFormOtp/LoginWithOtp'
import Layout from 'src/components/layout/LayoutAuth'
import { PublicOnlyRoute } from 'src/contexts/auth'
import { login } from "src/lib/auth/client";
import isBlank from 'src/packages/string-fns/isBlank';
const Login = () => {
  const router = useRouter()
  const {token=""} = router.query

  const handleOnLogin = () => {
    Router.push("/")
  }

  useEffect(() => {
    if(isBlank(token)) return
    // console.log("token", token)
    login(token as any)
    Router.push("/")
  }, [token])

  return (
    <Layout center>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Login</title>
      </Head>
      <div className="container1">
        <LoginFormOtp onSubmit={handleOnLogin} />
      </div>
    </Layout>
  )
}

export default function LoginPage()  {
  return (
    <PublicOnlyRoute>
      <Login />
    </PublicOnlyRoute>
  )
}
