import request from "request";
import { JSDOM } from "jsdom";

const URL = "https://www.gate.io/startup";

const ACTIVE_ELEMENTS_CLASSES = `.effective-startup-item`;
const NO_INITIAL_LABEL_CLASSES = ".title-tip.title-tip-NONINITIAL";
const INITIAL_LABEL_CLASSES = ".title-tip.title-tip-INITIAL";

const getHtml = () =>
  new Promise((resolve, reject) => {
    request({ uri: URL }, (error, _, html) => {
      if (error) {
        reject(error);
      }
      if (html) {
        resolve(html);
      }
    });
  });

export const getNames = async () => {
  const html = await getHtml().catch(console.log);

  if (!html) {
    return [];
  }

  const { window } = new JSDOM(html);

  const activeElements = [];
  window.document
    .querySelectorAll(ACTIVE_ELEMENTS_CLASSES)
    .forEach((el) => activeElements.push(el));

  const answer = [];

  activeElements.forEach(async (el) => {
    const name = el.querySelector("h3")?.textContent.trim();
    answer.push(name);
  });

  return answer;
};
