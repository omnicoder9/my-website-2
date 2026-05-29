# Arch Linux Commands Cheat Sheet

Daily Arch Linux commands for package management, AUR builds, systemd services, networking, storage, users, and recovery.

## Safe System Update Sequence

1. Read recent Arch news before major upgrades:
   `xdg-open https://archlinux.org/news/`
2. Refresh the keyring first if signatures fail or the install is stale:
   `sudo pacman -Sy archlinux-keyring`
3. Perform a full system upgrade:
   `sudo pacman -Syu`
4. Review failed services after the update:
   `systemctl --failed`
5. Review orphaned packages before removing anything:
   `pacman -Qdtq`

## Pacman: Packages and Updates

- `sudo pacman -Syu`
  Synchronize repositories and upgrade every installed package.
- `sudo pacman -S <package>`
  Install a package from enabled repositories.
- `pacman -Ss <term>`
  Search package names and descriptions.
- `pacman -Qi <package>`
  Show installed package metadata, dependencies, and install reason.
- `pacman -Ql <package>`
  List files installed by a package.
- `pacman -Qo <path>`
  Show which package owns a file.
- `sudo pacman -Rns <package>`
  Remove a package, unused dependencies, and tracked config files.
- `pacman -Qdtq`
  List orphaned dependency packages.
- `sudo pacman -Sc`
  Clean old package cache entries.

## AUR: Build User Repository Packages

- `sudo pacman -S --needed base-devel git`
  Install the standard build toolchain.
- `git clone https://aur.archlinux.org/<package>.git`
  Download AUR package build files.
- `cd <package>`
  Enter the package build directory.
- `less PKGBUILD`
  Review what the package downloads, builds, and installs.
- `makepkg -si`
  Build the package and install missing repository dependencies.
- `makepkg --clean`
  Remove build artifacts after a successful build.

## Systemd: Services and Logs

- `systemctl --failed`
  List failed units.
- `systemctl status <unit>`
  Show service state, recent logs, and unit metadata.
- `sudo systemctl start <unit>`
  Start a service now.
- `sudo systemctl stop <unit>`
  Stop a service now.
- `sudo systemctl enable --now <unit>`
  Start a service now and enable it for future boots.
- `sudo systemctl disable --now <unit>`
  Stop a service now and disable it for future boots.
- `journalctl -b -p warning`
  Show warnings and errors from the current boot.
- `journalctl -u <unit> -b`
  Show current boot logs for one systemd unit.
- `journalctl -f`
  Follow live logs.

## Networking and DNS

- `ip addr`
  List network interfaces, addresses, and link state.
- `ip link`
  Show network device state.
- `ip route`
  Show routes and default gateway.
- `resolvectl status`
  Show DNS servers and resolver state.
- `nmcli device status`
  Show NetworkManager device state.
- `nmcli connection show`
  List NetworkManager connections.
- `ping -c 4 archlinux.org`
  Send four ICMP packets to test reachability.
- `ss -tulpn`
  Show listening TCP and UDP sockets with owning processes.

## Storage, Mounts, and Space

- `lsblk -f`
  Show disks, partitions, filesystems, labels, UUIDs, and mount points.
- `findmnt`
  Show the filesystem mount tree.
- `df -h`
  Show mounted filesystem capacity in human-readable units.
- `du -sh * 2>/dev/null`
  Summarize size by directory in the current location.
- `sudo mount /dev/<partition> /mnt`
  Mount a partition for repair, install, backup, or recovery.
- `sudo umount /mnt`
  Unmount a mounted filesystem.
- `blkid`
  Print block device UUIDs and filesystem types.

## Users and Sudo

- `whoami`
  Print the active username.
- `id`
  Show UID, GID, and group membership.
- `groups <user>`
  Show groups for a user.
- `sudo usermod -aG wheel <user>`
  Add a user to the common admin group used by sudoers examples.
- `passwd`
  Change the current user's password.
- `sudo passwd <user>`
  Change another user's password.
- `sudo visudo`
  Edit sudoers safely with syntax checking.

## Recovery and Maintenance

- `sudo pacman -Sy archlinux-keyring`
  Refresh Arch signing keys before a full upgrade.
- `sudo pacman -Qkk`
  Verify installed package files.
- `sudo mkinitcpio -P`
  Rebuild initramfs images for all configured presets.
- `sudo grub-mkconfig -o /boot/grub/grub.cfg`
  Regenerate GRUB configuration.
- `arch-chroot /mnt`
  Enter an installed system from live media after mounting it under `/mnt`.
- `pacman -Qe`
  List explicitly installed packages.
- `pacman -Qm`
  List foreign packages, usually AUR or manually installed packages.

## Important Habits

- Avoid partial upgrades. Prefer `sudo pacman -Syu` before installing new software.
- Read Arch news before large upgrades, especially when core libraries, Python, kernels, or boot components change.
- Review AUR `PKGBUILD` files before running `makepkg -si`.
- Keep a recent bootable install USB available for recovery.
