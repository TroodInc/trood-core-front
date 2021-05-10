#!/bin/bash
cp /usr/share/nginx/html/static/"${CORE_VERSION}"/sw/* /usr/share/nginx/html/
envsubst < /home/templates/index.html > /usr/share/nginx/html/index.html
python3 /home/fragment.py config
python3 /home/fragment.py update