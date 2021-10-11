import os from "os"
import * as core from "@actions/core";

import {getDownloadFile} from "./dl";
import {cliRun} from "./cli";

export function installPackage() {
    const file = getDownloadFile()
    if (!file) {
        return
    }

    core.info('start install:' + file)

    switch (os.platform()) {
        case "win32":
            // https://github.com/Squirrel/Squirrel.Windows/pull/187
            cliRun(file, ["-s"])
            break
        case 'linux':
            cliRun("sudo", ["apt", "update"])
            cliRun("sudo", ["dpkg", "-i", file])
            cliRun("sudo", ["apt", "--fix-broken", "-y", "install"])
            cliRun("sudo", ["snap", "install", "chromium-ffmpeg"])
            cliRun("sudo", ["ln", "-s", "/snap/chromium-ffmpeg/current/chromium-ffmpeg-104195/chromium-ffmpeg/libffmpeg.so", "/usr/lib/x86_64-linux-gnu/libffmpeg.so"])
            cliRun("sudo", ["apt", "install", "-qq", "-y", "xpra", "dbus-x11"])
            break
        case  'darwin':
            cliRun("unzip", ["-qq", file])
            break
        default:
            core.setFailed(`${os.platform()} is not supported[only support linux[debian&ubuntu] & macOS, win32]`)
            return
    }
}
