import * as core from "@actions/core";
import * as child_process from "child_process";

/**
 * 运行 cli 命令
 * @param cli
 * @param args
 */
export function cliRun(cli: string, args: string[] | null = null) {
    core.info(`${cli} ${(args || []).join(" ")}`)
    let ret = child_process.spawnSync(cli, args || [])
    if (ret.status !== 0) {
        core.warning(`stdout: ${ret.stdout}`)
        core.error(`stderr: ${ret.stderr}`)
        core.setFailed(`exec ${cli} failed`)
    } else {
        core.info(ret.stdout.toString())
        core.warning(ret.stderr.toString())
    }
}
