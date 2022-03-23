#!/bin/bash

loopPid=0
pid=0

sigterm_handler() {
  pkill -P "$pid"
  wait "$pid"
  echo "sigterm handled gracefully"
  exit 0;
}
trap 'sigterm_handler' SIGTERM

sigint_handler() {
  wait "$pid"
  wait "$loopPid"
  echo "sigint handled gracefully"
  exit 0;
}
trap 'sigint_handler' SIGINT

exec yarn firebase emulators:start --import=../../data/firebase --export-on-exit &
pid="$!"

# wait forever
tail -f /dev/null &
loopPid="$!"
wait "$loopPid"

echo "Not a gracefully shutdown"
exit 1;