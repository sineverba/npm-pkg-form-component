SONARSCANNER_VERSION=11.1.1.1661_6.2.1

sonar:
	docker run \
		--rm \
		-it \
		--name sonarscanner \
		-v $(PWD):/usr/src \
		-e SONAR_HOST_URL=$(SONAR_HOST_URL) \
		-e SONAR_TOKEN=$(SONAR_TOKEN) \
		-e SONAR_SCANNER_OPTS="-Xmx1024m" \
		sonarsource/sonar-scanner-cli:$(SONARSCANNER_VERSION)

upgrade:
	npx ncu \
		-x @testing-library/react \
		-x @types/react \
		-u
	npx update-browserslist-db@latest
	npm install
	npm audit fix || exit 0;