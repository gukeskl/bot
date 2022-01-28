import { client } from "./whatsapp.js";
import { getNames } from "./getNames.js";

const PHONE_NUMBERS = [
  "48696438619",
  //"48694570298", "48576830768"
];

const informThatServerHasStarted = () => {
  PHONE_NUMBERS.forEach(async (number) => {
    const number_details = await client.getNumberId(number);

    if (number_details) {
      client.sendMessage(number_details._serialized, "Server has started");
    } else {
      console.log(
        number_details,
        "Server init - Mobile number is not registered"
      );
    }
  });
};

const informAboutNames = (names) => {
  names.forEach((name) => {
    PHONE_NUMBERS.forEach(async (number) => {
      const number_details = await client.getNumberId(number);

      if (number_details) {
        client.sendMessage(number_details._serialized, name);
      } else {
        console.log(number_details, number + " is not registered");
      }
    });
  });
};

const logCurrentStatus = (names) => {
  console.clear();
  console.log(new Date());
  console.log(names);
};

export const server = async () => {
  // initialization
  await client.initialize();
  let names = await getNames();
  informThatServerHasStarted();
  informAboutNames(names);

  // server
  const interval = setInterval(async () => {
    const currentNames = await getNames();

    if (currentNames) {
      const newNames = currentNames.filter((name) => !names.includes(name));

      if (newNames.length === 0) {
        logCurrentStatus(names);
        return;
      }

      names = currentNames;
      informAboutNames(newNames);
    }
  }, 5000);

  process.on("SIGINT", function () {
    clearInterval(interval);
    process.exit();
  });
};
