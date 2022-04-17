import { Command } from './../utils/command/command.type';
import { Path } from '@swindle/filesystem';
import { Process } from '@swindle/os';
import { CommandStatus } from './../utils/command/command-status';
import { buildApp } from './../utils/build/build-app';
import container from './../utils/container';
import { Logger } from '../utils/logger/logger';

export const runBuild: Command = async () => {
    const root = Process.Cwd();
    const logger = container.get(Logger);

    try {
        await buildApp({
            root: root,
            assetsDir: Path.FromSegments(root, 'src/assets/'),
            clientEntryPoint: Path.FromSegments(root, 'src/client.ts'),
            outputDir: Path.FromSegments(root, 'dist'),
            serverEntryPoint: Path.FromSegments(root, 'src/server.ts'),
            onBeforeRollup: async () => {
                logger.info('Building your application');
            },
            onGenerate: async () => {
                logger.info('Successfully created your application.');
            }
        });
        return CommandStatus.Success;
    }
    catch(e) {
        const error = e as Error;
        logger.error(error.message);
        return CommandStatus.Error;
    }
}