FROM registry.tools.trood.ru/frontcore:latest

COPY build/static /usr/share/nginx/html/static
COPY templates /home/templates
COPY rollup.sh /home
RUN chmod +x /home/rollup.sh    