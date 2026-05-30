"use client";
import React, { useContext } from "react";
import { useTina } from "tinacms/dist/react";
import { GlobalQuery } from "../../tina/__generated__/types";

interface LayoutState {
  // globalSettings stammt jetzt aus useTina -> trägt die nicht-enumerierbaren
  // _content_source-Metadaten. Damit findet tinaField(globalSettings.<obj>, "<feld>")
  // den richtigen Pfad und Click-to-Edit + Live-Update funktionieren.
  globalSettings: GlobalQuery["global"];
  pageData: {};
  theme: GlobalQuery["global"]["theme"];
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: {
        color: "#800000",
      },
      globalSettings: undefined,
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  // Ganze Global-Query (nicht nur .global), plus query + variables —
  // genau das, was useTina zum Hydratisieren im Browser braucht.
  query: string;
  variables: object;
  data: GlobalQuery;
  pageData: {};
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  query,
  variables,
  data,
  pageData,
}) => {
  // useTina injiziert die _content_source-Metadaten und liefert bei jedem
  // Tastendruck im Editor frische liveData -> globale Felder werden live.
  const { data: liveData } = useTina({ query, variables, data });
  const globalSettings = liveData.global;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        pageData,
        theme: globalSettings?.theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
