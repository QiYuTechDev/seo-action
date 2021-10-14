import * as core from "@actions/core";
import fetch from 'node-fetch'
import {downloadPackage} from "./dl";
import {installPackage} from "./install";
import {runSeo} from "./run";
import {runCode} from "./code";

globalThis.fetch = fetch as any


async function main(): Promise<void> {
    try {
        const version: string = core.getInput("version")

        core.info(`use seo version: ${version}`)
        await downloadPackage(version)
        installPackage()
        runSeo()
        setTimeout(async () => {
            await runCode()
            process.exit(0)
        }, 10 * 1000) // wait seo startup
    } catch (error: any) {
        core.setFailed((error as Error).message);
    }
}

main().then(() => {
    console.info('done')
})
