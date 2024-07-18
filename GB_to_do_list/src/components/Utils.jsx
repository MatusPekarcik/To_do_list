import axios from 'axios';

export async function message(cmd,data) {
    if (!data) data = {};
    data.cmd=cmd;
    var e = new CustomEvent('Command',{detail:data});
    window.dispatchEvent(e);
}


export async function transfer(url,data,method) {
    try { 
    console.log(`before axios.${method}`,data);
  
    if(url.indexOf(':')==-1) url=`http://localhost:${port}/${url}`;  
    if(!method) method='post';
  
    let response;
    switch (method) {
      case 'delete': { response = await axios.delete(url); data=null; break}
      case 'put'   : { response = await axios.put(url,data);   data=response.data;  break}
      case 'get'   : { response = await axios.get(url);        data=response.data;  break}
      case 'patch' : { response = await axios.patch(url,data); break}
      case 'post'  : { response = await axios.post(url,data);  data = response.data; break }
      default:  {throw new Error(`Invalid method ${method}`) }     
  
    }
  
    console.log(`after axios.${method}`,data, response);
    return data;
  
    }
    catch (error) {
      //console.log(error.message);
      throw new Error(`Request error: "${url}",${error.message}` );
    }
  
  }