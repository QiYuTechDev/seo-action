import fs from "fs";
import os from "os";
import * as core from "@actions/core";
import {Ci, RestCiArgs} from "qiyu-seo"
import {cliRun} from "./cli";
import {debugMode} from "./debug";

/**
 * 运行 custom 代码
 */
export async function runCode() {
    const url: string = core.getInput("url")
    const code_file: string = core.getInput("code")
    const snapshot = core.getBooleanInput("snapshot")
    const pdf = core.getBooleanInput("pdf")
    const video = core.getBooleanInput("video")
    const rrweb = core.getBooleanInput("rrweb")
    const timeout = Number(core.getInput("timeout"))

    const code = fs.readFileSync(`${process.env['GITHUB_WORKSPACE']}/${code_file}`, {encoding: 'utf-8'})

    core.info(`try to visit url: ${url}`)
    core.info(`js code:\n${code}\n\n`)

    const args: RestCiArgs = {
        url: url,
        fn_code: code,
        timeout: timeout,
        auto_close: true,
        snapshot: snapshot,
        pdf: pdf,
        video: video,
        rrweb: rrweb,
    }

    const bearer = process.env['SEO_REST_API_BEARER'] || 'seo'

    if (debugMode() && os.platform() === 'linux') {
        cliRun("sudo", ["netstat", "-plnt"])
    }

    const resp = await Ci.do_post({body: args, security: {bearer}},
        async (resp) => {
            return await resp.json()
        },
        async (resp) => {
            const txt = await resp.text()
            core.setFailed(`失败:
http code: ${resp.status} 
result: ${txt}
`)
        })

    core.info("success:")
    core.info(JSON.stringify(resp, null, 2))
}
