import flatten from "flat";
import translation from "./translation.json";
import nav from "./nav.json";
import input from "./input.json";
import label from "./label.json";
import category from "./category.json";
import home from "./home.json";
import history from "./history.json";
import promotion from "./promotion.json";
import create from "./create.json";

export default {
  translation: flatten<Record<string, any>, typeof translation>(translation, {
    delimiter: "_",
  }),

  nav: flatten<Record<string, any>, typeof translation>(nav, {
    delimiter: "_",
  }),
  input: flatten<Record<string, any>, typeof translation>(input, {
    delimiter: "_",
  }),

  label: flatten<Record<string, any>, typeof translation>(label, {
    delimiter: "_",
  }),

  category: flatten<Record<string, any>, typeof translation>(category, {
    delimiter: "_",
  }),
  home: flatten<Record<string, any>, typeof translation>(home, {
    delimiter: "_",
  }),
  history: flatten<Record<string, any>, typeof translation>(history, {
    delimiter: "_",
  }),
  promotion: flatten<Record<string, any>, typeof translation>(promotion, {
    delimiter: "_",
  }),
  create: flatten<Record<string, any>, typeof translation>(create, {
    delimiter: "_",
  }),
};
