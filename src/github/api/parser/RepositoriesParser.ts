import BranchesParser from "../parser/BranchesParser";

class RepositoriesParser {
    public parseRepository(repositories: Array<any>, branches: any) {
        return repositories.map((repository) => {
            return {
                repository_name: repository.name,
                owner_login: repository.owner.login,
                branches: new BranchesParser().parseBranch(
                    branches[repository.name]
                ),
            };
        });
    }
}

export default RepositoriesParser;
