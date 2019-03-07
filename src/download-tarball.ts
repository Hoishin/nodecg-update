import fs from 'fs';
import os from 'os';
import path from 'path';
import axios from 'axios';
import makeDir from 'make-dir';

const tmpDir = fs.mkdtempSync(os.tmpdir(), 'utf8');

export const downloadTarball = async (url: string) => {
	if (!fs.existsSync(tmpDir)) {
		await makeDir(tmpDir);
	}
	const fileName = path.resolve(tmpDir, 'nodecg.tgz');
	const writeStream = fs.createWriteStream(fileName);
	const res = await axios.get(url, {responseType: 'stream'});
	res.data.pipe(writeStream);
	return new Promise<string>((resolve, reject) => {
		writeStream.addListener('finish', () => {
			resolve(fileName);
		});
		writeStream.addListener('error', (error) => {
			reject(error);
		});
	});
};
