import * as core from "@actions/core";
import {downloadPackage} from "./dl";
import {installPackage} from "./install";
import {runSeo} from "./run";


function main(): void {
    try {
        const version: string = core.getInput("version");
        core.info(`use seo version: ${version}`)
        downloadPackage(version)
        installPackage()
        runSeo()
    } catch (error: any) {
        core.setFailed((error as Error).message);
    }
}

main()
