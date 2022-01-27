import request from "request";
import { JSDOM } from "jsdom";

const URL = "https://www.gate.io/startup";

const ACTIVE_ELEMENTS_CLASSES = `.effective-startup-item`;
const NO_INITIAL_LABEL_CLASSES = ".title-tip.title-tip-NONINITIAL";
const INITIAL_LABEL_CLASSES = ".title-tip.title-tip-INITIAL";

let html;

const getHtml = (error, _, currentHtml) => {
  if (error) {
    console.log(error);
  }

  html = currentHtml;
};

export const getNames = async () => {
  request({ uri: URL }, getHtml);

  if (!html) {
    console.log("noHtml");
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
