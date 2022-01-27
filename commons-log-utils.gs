
function log_(execCtx, message) {
  Logger.log(message);
  execCtx.logs.appendRow([('' + new Date()), '' + message, '' + execCtx.tags, '' + execCtx.user]);
}
