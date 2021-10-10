import {Ci} from "qiyu-seo"
import * as core from "@actions/core";

export async function runCode() {
    const url: string = core.getInput("url")
    const code: string = core.getInput("code")
    const snapshot = core.getBooleanInput("snapshot")
    const pdf = core.getBooleanInput("pdf")
    const video = core.getBooleanInput("video")
    const rrweb = core.getBooleanInput("rrweb")
    const timeout = Number(core.getInput("timeout"))

    core.info(`try to visit url: ${url}`)

    const resp = await Ci.do_post({
        body: {
            url: url,
            fn_code: code,
            timeout: timeout,
            auto_close: true,
            snapshot: snapshot,
            pdf: pdf,
            video: video,
            rrweb: rrweb,
        },
        security: {bearer: 'seo'}
    })
    core.info(JSON.stringify(resp))
}
