import { ICommandResponse } from '../../../../shared/models/ICommandResponse';

export interface CreateCategoryResponse extends ICommandResponse {
  name: string;
  description: string;
}
