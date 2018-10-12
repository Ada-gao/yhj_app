FROM ypzhuang/cordova as builder

ENV GRADLE_USER_HOME=./.gradle_cache
WORKDIR /root
COPY . /root
RUN npm install --verbose
RUN cordova platform add android@7.1.0 browser@5.0.3 --nofetch
RUN npm run android-release && cordova prepare browser



FROM nginx:1.13.12-alpine
COPY --from=builder /root/platforms/browser/www /usr/share/nginx/html
COPY --from=builder /root/platforms/android/app/build/outputs/apk/release/app-release.apk /usr/share/nginx/html


COPY nginx.conf /etc/nginx/

ADD ./docker-run.sh /usr/share/nginx/

EXPOSE 80

CMD ["sh", "/usr/share/nginx/docker-run.sh"]
