export default (data) => { 
return `<!doctype html>
<html>
  <head>
    ${data.title.toString()}
    ${data.meta.toString()}
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/css/app.css?${data.epoch}" type="text/css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${data.root.toString()}</div>
    <script>window.__initialState = ${data.initialState}</script>
    <script src="/js/app.js?${data.epoch}"></script>
  </body>
</html>`
}
