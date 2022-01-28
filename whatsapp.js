import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

const session = {
  WABrowserId: '"hXs10UrpNHd5w7Ty1m4tnw=="',
  WASecretBundle:
    '{"key":"LPP1SwPzF427ej8k29nMMPQGuJNpejVekq1qnc7YunI=","encKey":"DJxRVe5yI+JZnirfGDlJ22jUdrziZTsredIVqLmIe7A=","macKey":"LPP1SwPzF427ej8k29nMMPQGuJNpejVekq1qnc7YunI="}',
  WAToken1: '"F2d/mFCO/93xQILAlgUHGXkt6NEsJgZ/kQFuRtB0DEQ="',
  WAToken2:
    '"1@TlmQF86O/Gh2Z0csxHGXQpOHLklRO/1fiQsIzD+R7XNE7kbkoZCDlGTowsosbRnr/E3U5Xxg1Ge7RQ=="',
};

const client = new Client({ session });

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("Client is ready!");
});

export { client };
