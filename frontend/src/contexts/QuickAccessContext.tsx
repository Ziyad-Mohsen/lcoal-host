import { createContext, useContext, useEffect, useState } from "react";

export type QuickAccessFolder = {
  path: string;
  name: string;
};

type QuickAccessContextType = {
  quickAccessFolders: QuickAccessFolder[];
  setQuickAccessFolders: React.Dispatch<
    React.SetStateAction<QuickAccessFolder[]>
  >;
} | null;

const QuickAccessContext = createContext<QuickAccessContextType>(null);

export default function QuickAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quickAccessFolders, setQuickAccessFolders] = useState<
    QuickAccessFolder[]
  >(() => {
    try {
      const stored = localStorage.getItem("quickAccessFolders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "quickAccessFolders",
      JSON.stringify(quickAccessFolders),
    );
  }, [quickAccessFolders]);

  return (
    <QuickAccessContext.Provider
      value={{ quickAccessFolders, setQuickAccessFolders }}
    >
      {children}
    </QuickAccessContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useQuickAccess = () => {
  const context = useContext(QuickAccessContext);
  if (context === null) {
    throw new Error("useQuickAccess must be used within QuickAccessContext");
  }
  return context;
};
