import i18next from "i18next";

export const fetch_lang = (k: string, item: any) => {
  let l = i18next.language;
  try {
    return item[k + "_" + l] ? item[k + "_" + l] : item[k];
  } catch (e) {}
  return item[k] ? item[k] : k;
};
