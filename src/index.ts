#!/usr/bin/env node

import cpx from 'cpx';
import {normalizeArgs} from './normalize-args';
import {getPackageUrl} from './nodecg-registry';
import {downloadTarball} from './download-tarball';
import {extractTarball} from './extract-tarball';

const args = normalizeArgs();

const main = async () => {
	const packageUrl = await getPackageUrl(args.version);
	const fileName = await downloadTarball(packageUrl);
	const extracted = await extractTarball(fileName);
	cpx.copySync(`${extracted}/**/*`, args.path);
};

main().catch((error) => {
	console.error(error);
});
