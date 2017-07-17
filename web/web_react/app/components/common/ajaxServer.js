// const ajax = ({
//   url,
//   method,
//   params = {},
//   responseType = 'json',
//   headers = {},
//   sync,
//   timeout = 300 * 1000,
//   success = () => {},
//   error = () => {},
// }) => {
//   const client = new XMLHttpRequest();
//   let reqPrams = null;
//   let reqUrl = url;
//   if (method === 'get') {
//     const temp = [];
//     // const keys = Object.keys(params);
//     for (const key in params) {
//       if (!key) {
//         continue;
//       }
//       let value = params[key];
//       if (value === null || value === undefined) {
//         value = '';
//       }
//       if (typeof value === 'object') {
//         value = JSON.stringify(value);
//       }
//       temp.push(`${key}=${encodeURIComponent(value)}`);
//     }
//     if (temp.length) {
//       reqUrl = reqUrl + (reqUrl.indexOf('?') !== -1 ? '&' : '?') + temp.join('&');
//     }
//   }
//   client.open(method, reqUrl, !sync);
//   if (!sync) {
//     client.responseType = responseType;
//     client.timeout = timeout;
//   }
//
//   // const keys = Object.keys(headers);
//   let hasContentType = false;
//   let jsonMode = false;
//   for (const key in headers) {
//     if (key.toString().toLowerCase() === 'content-type') {
//       hasContentType = true;
//       if (headers[key] === 'application/json') {
//         jsonMode = true;
//       }
//       if (headers[key] === 'multipart/form-data') {
//         continue;
//       }
//     }
//     client.setRequestHeader(key, headers[key]);
//   }
//
//   if (method !== 'get') {
//     if (!hasContentType) {
//       client.setRequestHeader('Content-Type', 'application/json');
//       jsonMode = true;
//     }
//     if (jsonMode) {
//       reqPrams = JSON.stringify(params);
//     }
//   }
//
//   client.onreadystatechange = () => {
//     if (client.readyState !== 4) {
//       return;
//     }
//     if (client.status === 200) {
//       let response = client.response;
//       if (responseType === 'json') {
//         try {
//           response = JSON.parse(client.response);
//         } catch (e) {
//           response = client.response;
//         }
//       }
//       success(response);
//     } else {
//       error(new Error(client.statusText));
//     }
//   };
//   client.send(reqPrams);
// };
//
// const get = ({url,method, params, responseType, headers, sync, timeout,success,error }) =>
//   ajax({
//     url,
//     method : 'get',
//     params,
//     responseType,
//     headers,
//     sync,
//     timeout,
//     success,
//     error,
//   });
//
//
// const post = ({url, method, params, responseType, headers, sync,timeout,success,error }) =>
//   ajax({
//     url,
//     method : 'post',
//     params,
//     responseType,
//     headers,
//     sync,
//     timeout,
//     success,
//     error,
//   });
//
// export {ajax, get, post}





/* 封装ajax函数
 2  * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 3  * @param {string}opt.url 发送请求的url
 4  * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 5  * @param {object}opt.data 发送的参数，格式为对象类型
 6  * @param {function}opt.success ajax发送并接收成功调用的回调函数
 7  */
      function ajax(opt) {
          opt = opt || {};
         opt.method = (opt.method==null?"GET":opt.method.toUpperCase());
         opt.url = opt.url || '';
         opt.async = opt.async || true;
         opt.data = opt.data || null;
         opt.success = opt.success || function () {};
         var xmlHttp = null;
         if (XMLHttpRequest) {
             xmlHttp = new XMLHttpRequest();
         }
         else {
             xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
         }var params = [];
         for (var key in opt.data){
             params.push(key + '=' + opt.data[key]);
         }
         var postData = params.join('&');
         if (opt.method.toUpperCase() === 'POST') {
             xmlHttp.open(opt.method, opt.url, opt.async);
             xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
             xmlHttp.send(postData);
         }
         else if (opt.method.toUpperCase() === 'GET') {
             xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
             xmlHttp.send(null);
         }
         xmlHttp.onreadystatechange = function () {
             if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                 opt.success(xmlHttp.responseText);
             }
         };
     }

export {ajax}
