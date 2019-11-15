#!make

.PHONY: startMongo
startMongo: mongo.pid

mongo.pid:
	{ docker-compose up -d & echo $$! > $@; }

.PHONY: stopMongo
stopMongo:
	-docker-compose down
	-rm mongo.pid

.PHONY: startServer
startServer: server.pid

server.pid:
	{ cd server && yarn start > server.log 2> server.err & echo $$! > $@; }

.PHONY: stopServer
stopServer: server.pid
	-kill `cat $<`
	-rm server/server.log
	-rm server/server.err
	-rm $<

.PHONY: serverLogs
serverLogs:
	tail -F server/server.log server/server.err

.PHONY: startServer
startWeb: web.pid

web.pid:
	{ cd web && yarn start > web.log 2> web.err & echo $$! > $@; }

.PHONY: stopWeb
stopWeb: web.pid
	-kill `cat $<`
	-rm web/web.log
	-rm web/web.err
	-rm $<

.PHONY: webLogs
webLogs:
	tail -F web/web.log web/web.err

.PHONY: logs
logs:
	tail -F server/server.log server/server.err web/web.log web/web.err

.PHONY: startup
startup: startMongo startServer startWeb

.PHONY: shutdown
shutdown: stopMongo stopServer stopWeb
