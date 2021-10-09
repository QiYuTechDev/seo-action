import * as core from "@actions/core";
import {downloadPackage} from "./dl";
import {installPackage} from "./install";
import {runSeo} from "./run";


function main(): void {
    try {
        const version: string = core.getInput("version")
        const url: string = core.getInput("url")
        const code: string = core.getInput("code")
        const snapshot = core.getBooleanInput("snapshot")
        const pdf = core.getBooleanInput("pdf")
        const timeout = Number(core.getInput("timeout"))

        core.info(`use seo version: ${version}`)
        downloadPackage(version)
        installPackage()
        runSeo()
        core.info(`try to visit url: ${url}`)
    } catch (error: any) {
        core.setFailed((error as Error).message);
    }
}

main()
