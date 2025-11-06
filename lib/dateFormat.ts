export async function formatDateLocale(date: Date, localeCode: string) {
  const { format } = await import("date-fns");
  const locale = await import(`date-fns/locale/${localeCode}/index.js`)
    .then(m => m.default)
    .catch(() => null);
  return locale ? format(date, "PPP", { locale }) : format(date, "PPP");
}