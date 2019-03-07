import path from 'path';
import {argv} from 'yargs';

export const normalizeArgs = () => {
	const targetVersion = argv.v || argv.version;
	if (
		typeof targetVersion !== 'string' &&
		typeof targetVersion !== 'number'
	) {
		throw new Error(`Version have to be specified: -v or --version`);
	}
	const targetPath = argv.p || argv.path;
	if (typeof targetPath !== 'string') {
		throw new Error(`Target path have to be specified: -p or --path`);
	}
	const absTargetPath = path.resolve(process.cwd(), targetPath);
	return {
		version: String(targetVersion),
		path: absTargetPath,
	};
};
