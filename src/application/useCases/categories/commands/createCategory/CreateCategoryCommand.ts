import { ICommand } from '../../../../shared/models/ICommand';

export interface CreateCategoryCommand extends ICommand {
  name: string;
  description: string;
}
