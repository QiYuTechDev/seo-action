import * as core from "@actions/core";
import * as child_process from "child_process";

/**
 * 运行 cli 命令
 * @param cli
 * @param args
 */
export function cliRun(cli: string, args: string[] | null = null) {
    const debug = core.getBooleanInput("debug")

    core.info(`${cli} ${(args || []).join(" ")}`)
    let ret = child_process.spawnSync(cli, args || [])
    if (ret.status !== 0) {
        if (debug) {
            core.warning(`stdout: ${ret.stdout}`)
            core.error(`stderr: ${ret.stderr}`)
        }
        if (cli === "xpra") {
            core.warning("xpra exec failed")
        } else {
            core.setFailed(`exec ${cli} failed`)
        }
    } else {
        if (debug) {
            core.info(ret.stdout.toString())
            core.warning(ret.stderr.toString())
        }
    }
}
