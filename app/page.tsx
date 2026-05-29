import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import HomeClientPage from "@/components/mende/home-client-page";

export const revalidate = 300;

export default async function Home() {
  const data = await client.queries.home({
    relativePath: "index.json",
  });

  return (
    <Layout rawPageData={data}>
      <HomeClientPage {...data} />
    </Layout>
  );
}
