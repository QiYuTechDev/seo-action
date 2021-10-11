import * as core from "@actions/core";

/**
 * 调试模式
 */
export function debugMode(): boolean {
    return core.getBooleanInput("debug") || false
}
