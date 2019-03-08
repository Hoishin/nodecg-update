import {main} from '../src/main';

test('test', async () => {
	await expect(async () => {
		await main({version: 'latest', path: '/tmp/nodecg'});
	}).not.toThrow();
});
