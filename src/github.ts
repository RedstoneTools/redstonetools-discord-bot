import config from './config.json' assert { type: 'json' };
import { App, Octokit, createNodeMiddleware } from 'octokit';
import { components } from '@octokit/openapi-types';

import { createServer } from 'http';

const app = new App({
	...config.github,
	oauth: { clientId: undefined, clientSecret: undefined },
});

type RepositoryType = components['schemas']['repository'];

interface RepositoryInfo {
	owner: RepositoryType['owner']['login'];
	repo: RepositoryType['name'];
}

let context: {
	octokit: Octokit | null;
	repository: RepositoryType | null;
	repositoryInfo: RepositoryInfo | null;
	githubApp: App;
} = {
	octokit: null,
	repository: null,
	repositoryInfo: null,
	githubApp: app,
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
			githubApp: app,
		};
	}
}
const middleware = createNodeMiddleware(app);
createServer(middleware).listen(4567);

export const { octokit, repository, repositoryInfo, githubApp } = context;
