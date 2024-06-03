FROM node:lts-alpine

WORKDIR /
COPY . .

ARG BUILDVAR

RUN if [ "$BUILDVAR" = "PRODUCTION" ]; then \
        npm install && npm install serve && \
        npm install react-scripts && npm run build; \
    else \
        npm install && npm install serve && \
        npm install react-scripts; \
    fi

EXPOSE 3000

CMD ["/bin/sh", "./run.sh"]