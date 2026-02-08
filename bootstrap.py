import shutil
import os
import subprocess
import sys

def find_pnpm():
    """
    Cross-platform pnpm resolver.
    Returns the absolute path to pnpm or pnpm.cmd.
    """
    # 1. Try PATH first (works on macOS/Linux, sometimes on Windows)
    pnpm_path = shutil.which("pnpm")
    if pnpm_path:
        return pnpm_path

    # 2. Windows-specific fallback: check AppData global npm path
    if os.name == "nt":
        user = os.environ.get("USERPROFILE") or os.environ.get("HOMEPATH")
        if user:
            candidate = os.path.join(user, "AppData", "Roaming", "npm", "pnpm.cmd")
            if os.path.exists(candidate):
                return candidate

        # 3. Check Program Files (Corepack shim location)
        corepack_candidate = r"C:\Program Files\nodejs\pnpm.cmd"
        if os.path.exists(corepack_candidate):
            return corepack_candidate

    # 4. If still not found, fail with a clean message
    raise FileNotFoundError(
        "pnpm not found. Ensure Corepack is enabled or pnpm is installed globally."
    )


def run_command(cmd, check=True):
    """
    Wrapper around subprocess.run with clean error handling.
    """
    try:
        result = subprocess.run(
            cmd,
            shell=False,
            check=check,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return result
    except FileNotFoundError as e:
        print(f"✗ Command not found: {cmd[0]}")
        raise e
