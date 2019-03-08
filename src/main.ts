import cpx from 'cpx';
import {getPackageUrl} from './nodecg-registry';
import {downloadTarball} from './download-tarball';
import {extractTarball} from './extract-tarball';

export const main = async (args: {version: string; path: string}) => {
	const packageUrl = await getPackageUrl(args.version);
	const fileName = await downloadTarball(packageUrl);
	const extracted = await extractTarball(fileName);
	cpx.copySync(`${extracted}/**/*`, args.path);
};
