import os from "os"
import * as core from "@actions/core"
import {cliRun} from "./cli";

function runLinux() {
    core.info("install mongodb")
    cliRun("sudo", ["apt", "install", "-y", "mongodb"])
    cliRun("xpra", ["start", "--start-child=\"seo --mongo-url=mongodb://127.0.0.1:27019 --test-mongo-server\"", "--bind-tcp=127.0.0.1:28182", "--html=off", "--exit-with-children", "--daemon=off"])
    cliRun("xpra", ["start", "--start-child=\"seo --mongo-url=mongodb://127.0.0.1:27019\"", "--bind-tcp=127.0.0.1:28182", "--html=on", "--exit-with-children", "--daemon=on"])
}

function runMacOS() {
    core.info("install mongodb")
    cliRun("brew", ["tap", "mongodb/brew"])
    cliRun("brew", ["install", "mongodb-community@5.0"])
    core.info("start mongodb")
    cliRun("brew", ["services", "start", "mongodb-community"])
    core.info("start seo")
    cliRun("./seo.app/Contents/MacOS/seo", ["--test-mongo-server", "--mongo-url=mongodb://127.0.0.1:27019"])
    cliRun("./seo.app/Contents/MacOS/seo", ["--mongo-url=mongodb://127.0.0.1:27019"], false)
}

function runWin32() {
    core.info("debug info")
    cliRun("whoami")
    cliRun("ls", ["c:\\\\users\\\\runneradmin\\\\AppData\\\\Local\\\\seo"])
    core.info("install mongodb")
    cliRun("choco", ["install", "mongodb"])
    core.info("show all windows services")
    core.info("start seo")
    cliRun("c:\\users\\runneradmin\\AppData\\Local\\seo\\seo.exe", ["--test-mongo-server", "--mongo-url=mongodb://127.0.0.1:27019"])
    cliRun("c:\\users\\runneradmin\\AppData\\Local\\seo\\seo.exe", ["--mongo-url=mongodb://127.0.0.1:27019"], false)
}

export function runSeo() {
    process.env["SEO_REST_API_ENABLE"] = "1"
    process.env['SEO_REST_API_HOST'] = "127.0.0.1"
    process.env['SEO_REST_API_PORT'] = "18082"

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
