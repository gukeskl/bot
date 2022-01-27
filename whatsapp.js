import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("Client is ready!");
});

export { client };
