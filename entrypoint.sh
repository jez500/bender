PERMISSION_ERROR="Check assets directory permissions & docker user or skip default assets install by setting the INIT_ASSETS env var to 0"

# Default assets & example configuration installation if possible.
if [[ "${INIT_ASSETS}" == "1" ]] && [[ ! -f /app/static/config.json ]]; then
    echo "No configuration found, installing default config & assets"
    if [[ ! -w /app/static/ ]]; then echo "Assets directory not writable. $PERMISSION_ERROR" && exit 1; fi

    while true; do echo n; done | cp -Ri /app/static-default/* /app/static/ &> /dev/null
    if [[ $? -ne 0 ]]; then echo "Fail to copy default assets. $PERMISSION_ERROR" && exit 1; fi

    yes n | cp -i /app/static-default/config.json.default /app/static/config.json &> /dev/null
    if [[ $? -ne 0 ]]; then echo "Fail to copy default config file. $PERMISSION_ERROR" && exit 1; fi
fi

echo "Starting webserver"
npm run start
