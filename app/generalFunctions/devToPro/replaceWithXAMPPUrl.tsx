import { useHttpProtocol } from "./useHttpProtocol";
import { useDev } from "./useDevOrigin";

export const isXAMPPDev = useDev;
export const placeXAMPPHostname = isXAMPPDev
  ? "192.168.1.137"
  : "modern-hostels.imaginative-accumulation.com";
export const placeXAMPPUrl = isXAMPPDev ? "/wordpress/" : "/";
export const fullWPURL = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}`;
