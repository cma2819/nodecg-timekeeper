FROM ghcr.io/nodecg/nodecg:2.1.11

USER root

WORKDIR /opt/nodecg/bundles/nodecg-timekeeper
COPY . /opt/nodecg/bundles/nodecg-timekeeper
RUN npm i

WORKDIR /opt/nodecg

EXPOSE 9090

CMD ["nodecg", "start"]