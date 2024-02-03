export default function im_group_receive_msg(jsonBody) {

    //通用。设置预置属性，打平JSON。
    jsonBody._channel_event_id = jsonBody.log_id;
    jsonBody._event_times = jsonBody.content.create_time;
    jsonBody._channel_type = 'douyin';
    jsonBody._channel_id = jsonBody.to_user_id;
    jsonBody._event_type = jsonBody.event;
    for (let key in jsonBody.content) {
        jsonBody[key] = jsonBody.content[key];
    }
    jsonBody.user_infos.forEach((userInfo, index) => {
        if (userInfo.open_id === jsonBody.from_user_id) {
            jsonBody._douyin_openid = userInfo.open_id
            jsonBody._nick_name = userInfo.nick_name;
            jsonBody._avatar = userInfo.avatar
        }
    });
    jsonBody._group_id = jsonBody.conversation_short_id
    jsonBody._group_name = jsonBody.group_info.group_name

    //通用。删除重复属性和深度结构。
    let keysToDelete = ['log_id', 'create_time', 'to_user_id', 'event', 'from_user_id', 'conversation_short_id']
    keysToDelete.forEach(key => {
        delete jsonBody[key];
    });
    delete jsonBody.content;
    delete jsonBody.user_infos;
    delete jsonBody.group_info;
    console.log(JSON.stringify(jsonBody))

    /*
    // Define the options for the POST request
    const options = {
    hostname: '53e17c1bdb944dfcb755b9996027cf60.flow.pstmn.io',
    path: '/',
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonBody, 'utf8')
    }
    };
    
    // Create a promise that will be resolved when the response is received
    const responsePromise = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
    res.setEncoding('utf8');
    let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        resolve(responseBody);
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    // Write data to request body
    req.write(event.body);
    req.end();
    });
    
    try {
    // Wait for the response
    const response = await responsePromise;
    console.log(`Response: ${response}`);
    } catch (error) {
    console.error(`Error: ${error.message}`);
    }*/
};