import os from 'os';
import path from 'path';
import fs from 'fs';
import tar from 'tar';

const tmpDir = fs.mkdtempSync(os.tmpdir());

export const extractTarball = async (tarPath: string) => {
	await tar.extract({
		cwd: tmpDir,
		file: tarPath,
	});
	return path.resolve(tmpDir, 'package');
};
