export const getURLParams = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop: string) => searchParams.get(prop),
  });

  return params;
};
