import * as core from "@actions/core";
import process from "process";
import * as child_process from "child_process";

/**
 * 运行 cli 命令
 * @param cli
 * @param args
 * @param sync
 * @param allow_fail
 */
export function cliRun(cli: string, args: string[] | null = null, sync = true, allow_fail = false) {
    const debug = core.getBooleanInput("debug")

    core.info(`${cli} ${(args || []).join(" ")}`)
    if (!sync) {
        const stdout: any[] = []
        const stderr: any[] = []
        const ret = child_process.spawn(cli, args || [], {detached: true})
        ret.stdout.on('data', (data) => {
            stdout.push(data)
        })
        ret.stderr.on('data', (data) => {
            stderr.push(data)
        })
        process.on('beforeExit', () => {
            core.info(`${cli} stdout:`)
            for (const s of stdout) {
                core.info(s)
            }
            core.warning(`${cli} stderr:`)
            for (const s of stderr) {
                core.warning(s)
            }
        })
        return
    }

    let ret = child_process.spawnSync(cli, args || [])
    if (ret.status !== 0) {
        if (debug) {
            core.warning(`stdout: ${ret.stdout}`)
            core.error(`stderr: ${ret.stderr}`)
        }
        if (allow_fail) {
            core.warning(`exec ${cli} ${JSON.stringify(args)} failed`)
        } else {
            core.setFailed(`exec ${cli} ${JSON.stringify(args)} failed`)
        }
    } else {
        if (debug) {
            core.info(ret.stdout.toString())
            core.warning(ret.stderr.toString())
        }
    }
}
