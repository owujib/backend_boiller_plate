import path from 'path';
import { IServerConfig } from '../interface/IServerConfig';

export const kernelConfig: IServerConfig = {
  controllersDir: path.join(__dirname, '../controllers'),
  routesDir: path.join(__dirname, '../routes'),
  providersDirs: '',
};
