:: build nuxt release
call npm run build
:: set current time as version
set version=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%
:: build docker image
docker build -t registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:%version% .
:: add latest tag
docker tag ^
registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:%version% ^
registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:latest
:: push image
docker push registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:%version%
docker push registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:latest
:: do push
git push
