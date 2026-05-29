import React from "react";
import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import DetailClientPage from "@/components/mende/detail-client-page";

export const revalidate = 300;

const RELATIVE_PATH = "der-kunstmaler.json";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.detailseite({
    relativePath: RELATIVE_PATH,
  });
  const seo = data.detailseite?.seo;
  return {
    title: seo?.title ?? undefined,
    description: seo?.description ?? undefined,
  };
}

export default async function DerKunstmalerPage() {
  const data = await client.queries.detailseite({
    relativePath: RELATIVE_PATH,
  });

  return (
    <Layout rawPageData={data}>
      <DetailClientPage {...data} />
    </Layout>
  );
}
