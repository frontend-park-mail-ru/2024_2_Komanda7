import { endpoint } from "../config.js";

export class FrontendAPI {
    /* *
    {path, headers = {}, needCredentials = false, id = null} 
    object like request
    */
    get(path, request) {
      request['method'] = 'GET';
      return this._commonFetchRequest(path, request);
      /*
      return this._commonFetchRequest({
          method: 'GET',
          path,
          headers,
          needCredentials,
          id,
      });*/
      }

      _removeNullUndefined(obj) {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }
    /**
     * { method, path, headers = {}, needCredentials = false,  body = null, id = null}
    */
    async _commonFetchRequest(path, request) {
      /*
        const id = request.id;
        const url = endpoint + request.path + (id ? `/${id}` : '');
        console.log(url);
        
        const pattern = this._removeNullUndefined(arguments[0]);
        console.log(pattern);
        const objRequest = {};

        for (const element in pattern) {
          if (element !== null && element !== undefined) {
            const name = Object.keys({element})[0];
            objRequest[name] = element;
          }
        }

        console.log(objRequest);
        */
        const url = endpoint + path;

        /* {
          method: request.method,
          headers: request.headers,
        }*/
  
        const response = await fetch(url, request);
        /*body: JSON.stringify(body),
          credentials: needCredentials ? 'include' : '',     */
        //const clonedResponse = response.clone();
    
        if (!response.ok) {
          const errorMessage = await response.text();
          throw {
            error: new Error(`Error ${response.status}: ${errorMessage}`),
            status: response.status,
          };
        }
        //const resp = await response.json();
        return response;
    }
}