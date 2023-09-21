const testnetConfig = {
  Base_URL: "http://192.168.50.78:4050/",
};
const mainnetConfig = {
  Base_URL: "",
};

const ngrokConfig = {
  Base_URL: "https://8772-139-135-36-160.ngrok-free.app",
};

const stagingConfig = {
  Base_URL: "https://stg-api.centrotaller.es/",
};

export const chatConfig = {
  // Base_URL: "http://192.168.50.78:5050/",
  Base_URL: "https://stg-chatapi.centrotaller.es/",
};

const defaultConfig = stagingConfig;
// const defaultConfig = testnetConfig;
//
export default defaultConfig;
