import os from "os"
import {cliRun} from "./cli";

function runLinux() {
    cliRun("Xvfb", ["/usr/lib/seo/seo", "--help"])
}

function runMacOS() {
    cliRun("./seo.app/Contents/MacOS/seo", ["--help"])
}

function runWin32() {
    cliRun("whoami")
    cliRun("ls", ["c:\\\\users\\\\runneradmin\\\\AppData\\\\Local\\\\seo"])
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
