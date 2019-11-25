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
	{ cd server && npm start > server.log 2> server.err & echo $$! > $@; }

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
startClient: client.pid

client.pid:
	{ cd client && npm start > client.log 2> client.err & echo $$! > $@; }

.PHONY: stopClient
stopWeb: client.pid
	-kill `cat $<`
	-rm client/client.log
	-rm client/client.err
	-rm $<

.PHONY: clientLogs
clientLogs:
	tail -F client/client.log client/client.err

.PHONY: logs
logs:
	tail -F server/server.log server/server.err client/client.log client/client.err

.PHONY: startup
startup: startMongo startServer startClient

.PHONY: shutdown
shutdown: stopMongo stopServer stopClient
