export function GetBrowserInfo() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Chrome") !== -1) {
    return "Google Chrome";
  } else if (userAgent.indexOf("Safari") !== -1) {
    return "Safari";
  } else if (userAgent.indexOf("Firefox") !== -1) {
    return "Mozilla Firefox";
  } else if (userAgent.indexOf("Edge") !== -1) {
    return "Microsoft Edge";
  } else if (
    userAgent.indexOf("Opera") !== -1 ||
    userAgent.indexOf("OPR") !== -1
  ) {
    return "Opera";
  } else if (userAgent.indexOf("Trident") !== -1) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}
