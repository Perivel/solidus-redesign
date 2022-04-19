/**
 * run-dev.ts
 * 
 * run-start.ts defines the runStart command.
 */

import { exec } from 'child_process'
import { Command } from '../utils/command/command.type';
import { CommandStatus } from '../utils/command/command-status';
import container from '../utils/container';
import { Logger } from '../utils/logger/logger';
import { Path } from '@swindle/filesystem';
import { Process } from '@swindle/os';

/**
 * runStart
 * 
 * Starts the application.
 */
export const runStart: Command = async () => {
    const logger = container.get(Logger);
    const serverEntry = Path.FromSegments(Process.Cwd(), 'dist/index.js');
    
    try {
        exec(`node ${serverEntry.toString()}`, (err, stdout, stderr) => {
            if (err) {
                throw new Error(err.message);
            }

            if (stdout) {
                logger.info(`\n${stdout}`);
            }

            if (stderr) {
                logger.error(stderr)
            }
        })
    }
    catch(e) {
        const error = e as Error;
        logger.error(error.message);
        return CommandStatus.Error;
    }

    return CommandStatus.Error;
}