import * as core from "@actions/core";

import {downloadPackage} from "./dl";
import {installPackage} from "./install";
import {runSeo} from "./run";
import {runCode} from "./code";


function main(): void {
    try {
        const version: string = core.getInput("version")
        const url: string = core.getInput("url")

        core.info(`use seo version: ${version}`)
        downloadPackage(version)
        installPackage()
        runSeo()
        setTimeout(async () => {
            await runCode()
        })
    } catch (error: any) {
        core.setFailed((error as Error).message);
    }
}

main()
