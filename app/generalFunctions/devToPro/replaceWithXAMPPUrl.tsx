import { useHttpProtocol } from "./useHttpProtocol";

export const isXAMPPDev = false;
export const placeXAMPPHostname = isXAMPPDev
  ? "192.168.1.137"
  : "modern-hostels.imaginative-accumulation.com";
export const placeXAMPPUrl = isXAMPPDev ? "/wordpress/" : "/";
export const fullWPURL = `${useHttpProtocol}${placeXAMPPHostname}${placeXAMPPUrl}`;
