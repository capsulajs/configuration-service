import {GetRequest, GetResponse } from '.';

export interface ConfigurationService<TGetReq, TGetResp> {
  new()
  get(request: GetRequest<TGetReq>): Promise<GetResponse<TGetResp>>;
  put(request: GetRequest<TGetReq>): Promise<GetResponse<TGetResp>>;
}
