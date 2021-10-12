import * as core from "@actions/core";

/**
 * 现实 notice for GitHub action
 * @param name
 */
export function showNotice(name: 'snapshot' | 'pdf' | 'rrweb' | 'result') {
    const run_id = process.env["GITHUB_RUN_ID"] || ""
    const repo = process.env['GITHUB_REPOSITORY'] || ""
    const gh_token = core.getInput("gh_token")
    if (!gh_token) {
        core.info('gh token is not valid(you can not direct view the result)')
        return
    }

    const url = new URL("https://ci.2cc.net")
    url.searchParams.set("run_id", run_id)
    url.searchParams.set("repo", repo)
    url.searchParams.set('name', name)
    url.searchParams.set("gh_token", gh_token)

    core.notice(`you can view ${name} by\n:${url.toString()}`)
}
