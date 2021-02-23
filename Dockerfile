FROM registry.tools.trood.ru/frontcore:latest

COPY build/static /usr/share/nginx/html/static
COPY templates /home/templates
COPY rollup.sh /home
COPY fragment.py /home
RUN chmod +x /home/rollup.sh \
    && chmod +x /home/fragment.py \
    && apt-get update \
    && apt-get install -y python3-distutils \
    && curl https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py \
    && python3 /tmp/get-pip.py \
    && pip install requests click\
    && mkdir /usr/share/nginx/html/fragments