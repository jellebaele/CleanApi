import { ICommand } from './ICommand';
import { ICommandResponse } from './ICommandResponse';

export interface ICommandHandler<
  T extends ICommand,
  U extends ICommandResponse
> {
  handle(command: T): Promise<U | null>;
}
