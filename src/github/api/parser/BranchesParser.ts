class BranchesParser {
    public parseBranch(response) {
        return response.map((branch: any) => {
            return {
                branch_name: branch.name,
                commit_sha: branch.commit.sha,
            };
        });
    }
}

export default BranchesParser;
