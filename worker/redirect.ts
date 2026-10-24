/**
 * Kleiner eigener Worker für rondpoint.lu (ohne www): leitet jede Anfrage dauerhaft auf
 * https://www.rondpoint.lu weiter, mit Pfad und Parametern. Die Website selbst läuft im Worker
 * rondpoint-website unter www.rondpoint.lu. Veröffentlichen: npx wrangler deploy -c wrangler.redirect.jsonc
 */
export default {
  fetch(req: Request): Response {
    const url = new URL(req.url);
    return Response.redirect(`https://www.rondpoint.lu${url.pathname}${url.search}`, 301);
  },
};
