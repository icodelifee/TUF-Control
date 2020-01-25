#!/bin/bash
echo $1 > /sys/devices/platform/faustus/kbbl/kbbl_mode
echo 2a > /sys/devices/platform/faustus/kbbl/kbbl_flags
echo 1 > /sys/devices/platform/faustus/kbbl/kbbl_set
