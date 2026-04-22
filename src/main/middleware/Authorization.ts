import express from 'express';
// import GeneralConfig from '../config/GeneralConfig';
// import APIUtility from '../utility/APIUtility';

export type ModulePermissions = {
  id: number;
  name: string;
  key: string;
  permission: string;
};
export function authorization(moduleKey: string, permission: string) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      /* const uri = `${GeneralConfig.SSO_URI}/check-permission`;

      await APIUtility.fetchGet({
        url: uri,
        headers: req.headers,
        queryData: {
          module: moduleKey,
          permission: permission,
        },
      }); */

      next();
    } catch (error) {
      next(error);
    }
  };
}

export async function checkPermissionModule(
  req: express.Request,
  moduleKey: string,
  permission: string,
): Promise<boolean> {
  /* const uri = `${GeneralConfig.SSO_URI}/check-permission`;

  const _result: any = await APIUtility.fetchGet({
    url: uri,
    headers: req.headers,
    queryData: {
      module: moduleKey,
      permission: permission,
    },
    hide_response: true,
  });

  if (_result.status !== 200) return false; */

  return true;
}
