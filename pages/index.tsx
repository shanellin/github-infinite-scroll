import type { GetServerSideProps } from "next"
// Components
import Head from "next/head"
import Layout from "@components/layout/index"
import HomePage from "@containers/home"
// Libs
import type { ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"
import assetPrefix from "@prefix"
import { getRepos, resetRepo } from "@slices/repo"
import { wrapper } from "@states/store"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
// Styles

const Home: NextPageWithLayout = (props) => {
  return (
    <>
      <Head>
        <title>Search page</title>
        <meta name="description" content="Github search" />
        <link rel="icon" href={`${assetPrefix}/images/favicon.ico`} />
      </Head>
      <HomePage {...props} />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async (context) => {
  const locale = context.locale || "en"
  
  let props = {}
  try {
    dispatch(resetRepo())
    await dispatch(getRepos()).unwrap() 
  } catch (err) {
    console.log(`The Error happened in getServerSideProps: ${err}`)
  } finally {
    props = {
      ...props,
      ...(await serverSideTranslations(locale, ["common"]))
    }
    return { props }
  }
})

export default Home
