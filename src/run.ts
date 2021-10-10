import os from "os"
import * as core from "@actions/core"
import {cliRun} from "./cli";

function runLinux() {
    core.info("install mongodb")
    cliRun("xpra", ["start", "--start-child=\"seo --help\"", "--bind-tcp=127.0.0.1:28182", "--html=on", "--exit-with-children", "--daemon=off"])
}

function runMacOS() {
    core.info("install mongodb")
    cliRun("brew", ["tap", "mongodb/brew"])
    cliRun("brew", ["install", "mongodb-community@5.0"])
    core.info("start mongodb")
    cliRun("brew", ["services", "start", "mongodb-community"])
    core.info("start seo")
    cliRun("./seo.app/Contents/MacOS/seo", ["--help"])
}

function runWin32() {
    core.info("debug info")
    cliRun("whoami")
    cliRun("ls", ["c:\\\\users\\\\runneradmin\\\\AppData\\\\Local\\\\seo"])
    core.info("install mongodb")
    cliRun("choco", ["install", "mongodb"])
    core.info("show all windows services")
    core.info("start seo")
    cliRun("c:\\users\\runneradmin\\AppData\\Local\\seo\\seo.exe", ["--help"])
}

export function runSeo() {
    switch (os.platform()) {
        case "linux":
            runLinux()
            break
        case "win32":
            runWin32()
            break
        case "darwin":
            runMacOS()
            break
        default:
            break
    }
}
