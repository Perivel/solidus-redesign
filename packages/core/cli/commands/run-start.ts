/**
 * run-dev.ts
 * 
 * run-start.ts defines the runStart command.
 */

import { Command } from '../utils/command/command.type';
import { CommandStatus } from '../utils/command/command-status';
import container from '../utils/container';
import { Logger } from '../utils/logger/logger';

/**
 * runStart
 * 
 * Starts the application.
 */
export const runStart: Command = async () => {
    const logger = container.get(Logger);
    logger.error("Command not implemented.");
    return CommandStatus.Error;
}