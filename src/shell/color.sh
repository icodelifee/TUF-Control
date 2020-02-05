# Red [00 - ff]
echo $1 > /sys/devices/platform/faustus/kbbl/kbbl_red
# Green [00 - ff]
echo $2 > /sys/devices/platform/faustus/kbbl/kbbl_green
# Blue [00 - ff]
echo $3 > /sys/devices/platform/faustus/kbbl/kbbl_blue
echo $4 > /sys/devices/platform/faustus/kbbl/kbbl_mode
echo 2a > /sys/devices/platform/faustus/kbbl/kbbl_flags
echo 1 > /sys/devices/platform/faustus/kbbl/kbbl_set