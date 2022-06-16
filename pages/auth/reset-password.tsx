import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import ResetPasswordForm from 'src/components/auth/ResetPasswordForm/ResetPasswordForm'
import Layout from 'src/components/layout/LayoutAuth'
import { PublicOnlyRoute } from 'src/contexts/auth'

const ResetPassword = () => {
  const handleOnResetPassword = () => {
    Router.push("/")
  }
  return (
    <Layout center>
      <Head>
      <title>{process.env.NEXT_PUBLIC_APP_NAME} - Reset Password</title>
      </Head>
      <div className="container1">
        <ResetPasswordForm onResetPassword={handleOnResetPassword} />
      </div>
    </Layout>
  )
}

export default function ResetPasswordPage()  {
  return (
    <PublicOnlyRoute>
      <ResetPassword />
    </PublicOnlyRoute>
  )
}