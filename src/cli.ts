#!/usr/bin/env node

import {normalizeArgs} from './normalize-args';
import {main} from './main';

main(normalizeArgs()).catch((error) => {
	console.error(error);
});
