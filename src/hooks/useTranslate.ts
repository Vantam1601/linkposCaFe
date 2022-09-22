import { useTranslation } from "react-i18next";
import { TOptions } from "i18next";

export type FormatMessageProps = {
  id: string | any;
  defaultMessage?: string;
} & TOptions;

export const useTranslate = () => {
  const { t } = useTranslation();
  return {
    formatMessage: ({ defaultMessage, id, ...props }: FormatMessageProps) =>
      t(id, defaultMessage, props),
  };
};
