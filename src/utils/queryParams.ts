"use client";

import { useRouter} from "next/navigation";   

// get the current URL search paramaters and set or update a specified paramater with a new value and update the URL using next/router without triggering a full page reload
const updateQueryParam = (router: ReturnType<typeof useRouter>, param: string, value: string) => {
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.set(param, value);
  router.push(`?${currentParams.toString()}`, {scroll:false});
};
// get the current URL search paramaters and delete a specified paramater if it exists and update the URL using next/router without triggering a full page reload
const removeQueryParam = (router: ReturnType<typeof useRouter>, param: string) => {
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.delete(param);
  router.push(`?${currentParams.toString()}`, {scroll:false});
};

// check if the code is running on the browser environment and get the current URL search paramaters and return the value of specified paramters or null if it doesn't exist
const getQueryParam = (param: string): string | null => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get(param);
};

export { updateQueryParam, removeQueryParam, getQueryParam };