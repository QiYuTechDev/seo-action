import * as core from "@actions/core";
import {Ci, RestCiArgs} from "qiyu-seo"

/**
 * 运行 custom 代码
 */
export async function runCode() {
    const url: string = core.getInput("url")
    const code: string = core.getInput("code")
    const snapshot = core.getBooleanInput("snapshot")
    const pdf = core.getBooleanInput("pdf")
    const video = core.getBooleanInput("video")
    const rrweb = core.getBooleanInput("rrweb")
    const timeout = Number(core.getInput("timeout"))

    core.info(`try to visit url: ${url}`)

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

    const resp = await Ci.do_post({body: args, security: {bearer}})
    core.info(JSON.stringify(resp))
}
