import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import { StickyBar } from "../mende/sticky-bar";
import { ThemeWrapper } from "./theme-wrapper";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const globalResponse = await client.queries.global(
    {
      relativePath: "index.json",
    },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    }
  );

  return (
    // query/variables/data komplett weiterreichen -> der Provider ruft useTina
    // damit auf und macht die globalen Felder live + click-to-editierbar.
    <LayoutProvider
      query={globalResponse.query}
      variables={globalResponse.variables}
      data={globalResponse.data}
      pageData={rawPageData}
    >
      <ThemeWrapper>
        <Header />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
        <StickyBar />
      </ThemeWrapper>
    </LayoutProvider>
  );
}
