import axios from 'axios';
import semver from 'semver';

const fetchNodecgRegistry = async () => {
	return (await axios.get('https://registry.npmjs.org/nodecg')).data;
};

export const getPackageUrl = async (versionLike: string) => {
	const registryInfo = await fetchNodecgRegistry();
	const distTagVersion: string = registryInfo['dist-tags'][versionLike];
	if (distTagVersion) {
		return registryInfo.versions[distTagVersion].dist.tarball;
	}
	const semverRange = semver.validRange(versionLike);
	if (semverRange === null) {
		throw new Error(`${versionLike} is not valid semver range`);
	}
	const versions = Object.keys(registryInfo.versions);
	const version = semver.maxSatisfying(versions, versionLike);
	if (version === null) {
		throw new Error(`Could not find a version in range of ${semverRange}`);
	}
	return registryInfo.versions[version].dist.tarball;
};
