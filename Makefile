SERVICE_NAME=corpsite
GIT_COMMIT=`git rev-parse --short HEAD`
-include .env
export

.PHONY: build-images
build-images:
	nerdctl build --platform=arm64,amd64 --tag containers.chewed-k8s.net/chewedfeed/${SERVICE_NAME}:${GIT_COMMIT} -f ./k8s/Containerfile .
	nerdctl tag containers.chewed-k8s.net/chewedfeed/${SERVICE_NAME}:${GIT_COMMIT} containers.chewed-k8s.net/chewedfeed/${SERVICE_NAME}:latest

.PHONY: publish-images
publish-images:
	nerdctl push containers.chewed-k8s.net/chewedfeed/${SERVICE_NAME}:${GIT_COMMIT} --all-platforms
	nerdctl push containers.chewed-k8s.net/chewedfeed/${SERVICE_NAME}:latest --all-platforms

.PHONY: build
build: build-images publish-images

.PHONY: publish
publish: publish-images

.PHONY: deploy
deploy:
	kubectl set image deployment/${SERVICE_NAME} ${SERVICE_NAME}=containers.chewed-k8s.net/chewedfeed/${SERVICE_NAME}:${GIT_COMMIT} --namespace=chewedfeed

.PHONY: build-deploy
build-deploy: build deploy
