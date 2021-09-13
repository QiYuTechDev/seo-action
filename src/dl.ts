import os from "os";
import * as core from "@actions/core";
import {cliRun} from "./cli";


/**
 * 获取下载的文件名
 */
export function getDownloadFile(): string | null {
    switch (os.platform()) {
        case 'linux':
            return `seo_amd64.deb`
        case 'darwin':
            return `mac.zip`
        case 'win32':
            return `seo_setup.exe`
        default :
            core.setFailed(`${os.platform()} is not supported[only support linux[debian&ubuntu] & macOS, win32]`)
            return null
    }
}


/**
 * 获取安装包下载的 URL
 * @param version
 */
export function getDownloadUrl(version: string): string | null {
    const prefix = 'https://github.com/QiYuTechDev/seo/releases/download'

    switch (os.platform()) {
        case 'linux':
            return `${prefix}/${version}/${getDownloadFile()}`
        case 'darwin':
            return `${prefix}/${version}/${getDownloadFile()}`
        case 'win32':
            return `${prefix}/${version}/${getDownloadFile()}`
        default :
            return null
    }
}

/**
 * windows not have wget cli
 */
function installWgetIfNeeded() {
    if (os.platform() === 'win32') {
        core.info("install wget for windows")
        cliRun("choco", ["install", "--no-progress", "wget"])
    }
}


export function downloadPackage(version: string) {
    const url = getDownloadUrl(version)
    if (!url) {
        core.setFailed('not supported platform[only support windows linux and macOS]')
        return
    }

    core.info('start download: ' + url)
    installWgetIfNeeded()
    cliRun("wget", ["-q", url])
}
