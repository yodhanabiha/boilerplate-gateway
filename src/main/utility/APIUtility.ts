import {IncomingHttpHeaders} from 'http';
import ErrorHandler from '../middleware/ErrorHandler';
import {StatusCode} from '../const';

export interface FetchPostInterface {
  url: string;
  headers?: IncomingHttpHeaders;
  bodyPayload?: any;
  hide_response?: boolean;
}

export interface FetchGetInterface {
  url: string;
  headers?: IncomingHttpHeaders;
  queryData?: any;
  hide_response?: boolean;
}

abstract class APIUtility {
  static async fetchPost(instance: FetchPostInterface) {
    const finalHeaders = new Headers();

    finalHeaders.set('Content-Type', 'application/json');
    if (instance.headers)
      finalHeaders.set('Authorization', instance.headers.authorization!);

    const result = await fetch(instance.url, {
      method: 'POST',
      body: JSON.stringify(instance.bodyPayload),
      headers: finalHeaders,
      signal: AbortSignal.timeout(300000),
    });

    if (!instance.hide_response) return this.constructResponse(result);

    return result;
  }

  static async fetchGet(instance: FetchGetInterface) {
    let finalUrl = instance.url;
    const finalHeaders = new Headers();

    finalHeaders.set('Content-Type', 'application/json');
    if (instance.headers)
      finalHeaders.set('Authorization', instance.headers.authorization!);

    if (instance.queryData) {
      finalUrl += '?';
      for (const key in instance.queryData) {
        finalUrl += key + '=' + instance.queryData[key] + '&';
      }
      finalUrl = finalUrl.substring(0, finalUrl.length - 1);
    }

    const result = await fetch(finalUrl, {
      method: 'GET',
      headers: finalHeaders,
    });

    if (!instance.hide_response) return this.constructResponse(result);

    return result;
  }

  private static async constructResponse(response: Response) {
    let jsonResult;
    const application = response.headers.get('content-type');
    if (application?.includes('application/json') && response.status != 200) {
      jsonResult = (await response.json()) as any;
      if (jsonResult.data)
        throw new ErrorHandler(
          response.status as StatusCode,
          jsonResult.message ?? null,
          jsonResult.data,
        );
      throw new ErrorHandler(
        response.status as StatusCode,
        jsonResult.message ?? null,
      );
    } else if (response.status != 200) {
      throw new ErrorHandler(response.status as StatusCode);
    }

    jsonResult = await response.json();
    return jsonResult;
  }
}

export default APIUtility;
