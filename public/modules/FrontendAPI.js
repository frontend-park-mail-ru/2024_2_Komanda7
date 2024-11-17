import { endpoint } from "../config.js";

class FrontendAPI {
    /* *
    {path, headers = {}, needCredentials = false, id = null} 
    object like request
    */
    get(path, request) {
      request['method'] = 'GET';
      return this._commonFetchRequest(path, request);
      }

    post(path, request) {
      request['method'] = 'POST';
      return this._commonFetchRequest(path, request);
    }
    put(path, request) {
      request['method'] = 'PUT';
      return this._commonFetchRequest(path, request);
    }

    delete(path, request) {
      request['method'] = 'DELETE';
      return this._commonFetchRequest(path, request);
    }

      _removeNullUndefined(obj) {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }
    async _commonFetchRequest(path, request) {
        const url = endpoint + path;
        const response = await fetch(url, request);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw {
            error: new Error(`Error ${response.status}: ${errorMessage}`),
            status: response.status,
          };
        }
        return response;
    }
}

export const api = new FrontendAPI();