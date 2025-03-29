export const useDev = true;

export const useDevOrigin = useDev
  ? "192.168.1.137/"
  : "modern-hostels.imaginative-accumulation.com/";

export const useXAMPPPath = useDev ? "wordpress/" : "";

export const useNextJSPort = useDev
  ? "192.168.1.137:3000/"
  : "modern-hostels.imaginative-accumulation.com/";

export const fetchOriginHeader = useDev
  ? "http://192.168.1.137:3000"
  : "https://modern-hostels.imaginative-accumulation.com";
