/**
 * Block Kit payload build utility methods.
 */
function slackMsgBlocksPayload(header, lines) {
  var blocks = [];
  if (header) {
    blocks.push(slackMsgBlock(header));
    blocks.push({
        "type": "divider"
    });
  }
  for (var i = 0; i < lines.length; i++) {
    blocks.push(slackMsgBlock(lines[i]));
  }
  return {
    "blocks": blocks
  };
}

/**
 * 
 */
function slackMsgBlock(line) {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": line
    }
  };
}

/**
 * 
 */
function newSlackChannel(execCtx, channelName) {
    var payload = { "name": channelName };
    var response = requestSlackApi(execCtx, 'https://slack.com/api/conversations.create', payload, 'createSlackChannel');
    if (response && response.getContentText) {
        var data = JSON.parse(response.getContentText());
        return data['channel']['id'];
    }
    return null;
}

/**
 * 
 */
function archiveSlackChannel(execCtx, channelId) {
    var payload = { "channel": channelId };
    var response = requestSlackApi(execCtx, 'https://slack.com/api/conversations.archive', payload, 'archiveSlackChannel');
    if (response && response.getContentText) {
        return JSON.parse(response.getContentText());
    }
    return null;
}

/**
 * 
 */
function inviteSlackMemebers(execCtx, channelId, userSlackIds) {
    var payload = { "channel": channelId, "users": userSlackIds.join(',') };
    var response = requestSlackApi(execCtx, 'https://slack.com/api/conversations.invite', payload, 'inviteSlackMemebers');
    if (response && response.getContentText) {
        return JSON.parse(response.getContentText());
    }
    return null;
}

/**
 * 
 */
function postSlackMessage(execCtx, channelId, text) {
    var payload = { "channel": channelId, "text": text };
    var response = requestSlackApi(execCtx, 'https://slack.com/api/chat.postMessage', payload, 'postSlackMessage');
    if (response && response.getContentText) {
        return JSON.parse(response.getContentText());
    }
    return null;
}

/**
 * 
 */
function requestSlackApi(execCtx, apiUrl, payload, description) {
  payload['token'] = execCtx.token;
  var options = {
    "method": "post", 
    "muteHttpExceptions": true, 
    "payload": payload
  };
  try {
      return UrlFetchApp.fetch(apiUrl, options);
  } catch (e) {
      log_(execCtx, 'Error while requesting Slack API [' + description + ']: ' + e);
  }
  return {};
}

/**
 * 
 */
function requestSlackWebHook(execCtx, payload, description) {
  var options = {
    "method": "post", 
    "contentType": "application/json", 
    "muteHttpExceptions": true, 
    "payload": JSON.stringify(payload) 
  };
  try {
      return UrlFetchApp.fetch(execCtx.webhook, options);
  } catch (e) {
      log_(execCtx, 'Error while requesting Slack Webhook API [' + description + ']: ' + e);
  }
  return {};
}

