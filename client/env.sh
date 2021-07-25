#!/bin/sh
# line endings must be \n, not \r\n !
echo "window._env_ = {" > ./build/env-config.js
echo 'API_ENDPOINT:' '"'$API_ENDPOINT'"'',' >> ./build/env-config.js
echo "}" >> ./build/env-config.js