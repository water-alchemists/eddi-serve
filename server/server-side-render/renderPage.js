function renderPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Eddi</title>
        <meta charset="utf8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="mount">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/jspdf/dist/jspdf.min.js"></script>
		<script src="/jspdf-autotable/dist/jspdf.plugin.autotable.js"></script>
		<script src="/bundle.js" type="text/javascript"></script>
      </body>
    </html>
    `
};

module.exports = renderPage;