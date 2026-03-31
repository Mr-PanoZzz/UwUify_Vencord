import definePlugin from "../utils/types";
import { findByProps } from "../webpack";

const smiles = [
  "^_^", "(・ω´・)", ">:3", "UwU", ">_<", ":3", "x3", "^._.^",
  "(* ^ ω ^)", "(o_ _)ﾉ彡☆", "(≧▽≦)", "(＾▽＾)", "(⌒_⌒;)",
  "(≧∀≦)", "(＞▽＜)", "(♥ω♥*)", "(✿◠‿◠)", "(｡♥‿♥｡)", "٩(◕‿◕｡)۶"
];

function uwufy(text: string): string {
  if (!text) return text;

  let result = text
    .replace(/ove/g, "uv")
    .replace(/th/g, "d")
    .replace(/Th/g, "D")
    .replace(/you/g, "u")
    .replace(/please/g, "pwease")
    .replace(/excuse me/g, "ummm..")
    .replace(/hello/g, "hewwo")
    .replace(/hi/g, "hai")
    .replace(/how are you/g, "howws u")
    .replace(/good/g, "gud")
    .replace(/ok/g, "oki")
    .replace(/want to/g, "wanna")
    .replace(/love/g, "wuv")
    .replace(/be/g, "bwe")
    .replace(/nice/g, "naice")
    .replace(/great/g, "gweat")
    .replace(/amazing/g, "amazin")
    .replace(/awesome/g, "awesum")
    .replace(/wonderful/g, "wundewful")
    .replace(/happy/g, "happii")
    .replace(/fun/g, "funnie")
    .replace(/exciting/g, "excitin")
    .replace(/pretty/g, "pwetty")
    .replace(/adorable/g, "adoraboo")
    .replace(/thank you/g, "thankies")
    .replace(/thank u/g, "thankies")
    .replace(/thanks/g, "thankies")
    .replace(/I'm straight/g, "I'm gway asff")
    .replace(/sir/g, "master")
    .replace(/hug/g, "huggie")
    .replace(/!/g, "!!")
    .replace(/\./g, "~.")
    .replace(/r|l/g, "w")
    .replace(/R|L/g, "W")
    .replace(/n([aeiou])/g, "ny$1")
    .replace(/N([aeiou])/g, "Ny$1")
    .replace(/N([AEIOU])/g, "NY$1");

  const sentences = result.split(". ");
  result = sentences
    .map((sentence) => {
      if (sentence.trim().length === 0) return sentence;
      // const smile = smiles[Math.floor(Math.random() * smiles.length)];
      // return sentence + " " + smile;
	 return sentence;
    })
    .join(". ");

  return result;
}

let originalSend: any = null;
let MessageUtilsModule: any = null;

export default definePlugin({
  name: "UwUify",
  description: "Turns all your messages way cuter!",
  authors: [{ name: "Mr_PanoZzz", id: "939129546551210056" }],
  version: "1.0.0",

  start() {
    const module = findByProps("sendMessage");
    if (!module || typeof module.sendMessage !== "function") {
      console.error("UwUifier › could not find MessageUtils.sendMessage");
      return;
    }

    MessageUtilsModule = module;
    if (!originalSend) {
      originalSend = module.sendMessage;
    }

    module.sendMessage = function (channelId: string, message: any, ...rest: any[]) {
      if (message && typeof message.content === "string") {
        message.content = uwufy(message.content);
      }
      return originalSend.call(this, channelId, message, ...rest);
    };
  },

  stop() {
    if (originalSend && MessageUtilsModule) {
      MessageUtilsModule.sendMessage = originalSend;
      originalSend = null;
      MessageUtilsModule = null;
    }
  },
});