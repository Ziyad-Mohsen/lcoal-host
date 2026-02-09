import { STORAGE_ROOT } from "@/constants";
import { useLocation } from "react-router-dom";

function isValidPathname(pathname: string) {
  const pathnameRegex = /^\/([a-zA-Z0-9-._~%!$&'()*+,;=:@/]*)$/;
  return pathnameRegex.test(pathname);
}

type HookReturn = {
  pathname: string;
  segments: string[];
  root: string;
  isRoot: boolean;
  join: (...segments: string[]) => string;
  shift: (shiftsCount: number) => string;
};

export function usePath(path?: string): HookReturn {
  const pathname = useLocation().pathname;
  const decodedPath = decodeURIComponent(path || pathname);
  const pathArr = pathname.split("/").filter(Boolean);
  const isRoot = !pathArr.length || pathArr.at(-1) === STORAGE_ROOT;
  if (STORAGE_ROOT && pathArr[0] !== STORAGE_ROOT)
    throw `Error: You are trying to use usePath hook from ${pathname}, Which is outside the specified root route /${STORAGE_ROOT}`;

  if (!isValidPathname(decodedPath))
    throw "Error: Invalid path used in usePath hook";

  if (STORAGE_ROOT) pathArr.shift();
  return {
    pathname: "/" + pathArr.join("/"),
    segments: pathArr,
    root: STORAGE_ROOT || ".",
    isRoot,
    join: (...segments) => {
      return "/" + [...pathArr, ...segments].join("/");
    },
    shift: (shiftsCount: number = 1) => {
      const newArr = pathArr;
      try {
        if (shiftsCount && newArr.length - shiftsCount > 0) {
          for (let i = 0; i < shiftsCount; i++) {
            newArr.pop();
          }
        } else {
          throw "Error: Too much pathname shifts";
        }
      } catch (error) {
        console.error(error);
      }

      return "/" + newArr.join("/");
    },
  };
}
