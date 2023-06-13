import config from './config.json' assert { type: 'json' };
import { App, Octokit } from 'octokit';
import { components } from '@octokit/openapi-types';

const app = new App(config.github);

type RepositoryType = components['schemas']['repository'];

interface RepositoryInfo {
	owner: RepositoryType['owner']['login'];
	repo: RepositoryType['name'];
}

let context: {
	octokit: Octokit | null;
	repository: RepositoryType | null;
	repositoryInfo: RepositoryInfo | null;
} = {
	octokit: null,
	repository: null,
	repositoryInfo: null,
};

for await (const { octokit, repository } of app.eachRepository.iterator()) {
	if (repository.html_url === config.github.url) {
		const repositoryInfo: RepositoryInfo = {
			owner: repository.owner.login,
			repo: repository.name,
		};

		context = {
			octokit,
			repository,
			repositoryInfo,
		};
	}
}

export const { octokit, repository, repositoryInfo } = context;
