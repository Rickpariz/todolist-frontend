import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export function format(date: string, format: string) {
  return formatInTimeZone(
    toZonedTime(date, "UTC"),
    "America/Sao_Paulo",
    format,
    {
      locale: ptBR,
    }
  );
}
