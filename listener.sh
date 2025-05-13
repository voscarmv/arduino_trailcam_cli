#!/bin/bash
source .env

stty -F $ARDUINOTTY 9600
tail -f $ARDUINOTTY | while read line ; do
  if test $line = "Movement detected" ; then
    ffmpeg -f video4linux2 -i $WEBCAM -vframes 1 -y out.jpg # Take a picture if movement detected
    node upload.js out.jpg # Then send it to a database here.
    printf '\x01' > $ARDUINOTTY # Toggle standby state off in the Arduino so it keeps detecting movement
  fi
done
