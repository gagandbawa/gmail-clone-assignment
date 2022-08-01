const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/folders', (req, res) => {
	let rawdata = fs.readFileSync('server/json/folders.json');
	let parsedObj = JSON.parse(rawdata);
	res.send(parsedObj);
});

app.get('/folders/:foldername', (req, res) => {
	const folderName = req.params.foldername.replace(' ', '_');
	let rawdata = fs.readFileSync(`server/json/${folderName}.json`);
	let parsedObj = JSON.parse(rawdata);
	res.send(parsedObj);
});
app.delete('/folders/:foldername', (req, res) => {
	const folderName = req.params.foldername.replace(' ', '_');
	console.log(folderName);
	if (['inbox', 'sent', 'drafts', 'spam', 'trash'].includes(folderName)) {
		res.status(403).send({});
	} else {
		res.send({ message: 'folder deleted' });
	}
});

app.post('/messages/:messageid', (req, res) => {
	console.log(req);
	if (req.body.type === 'star') {
		res.send({ message: 'conversation stared' });
	} else if (req.body.type === 'unstar') {
		res.send({ message: 'conversation unstared' });
	} else if (req.body.type === 'mark') {
		res.send({ message: 'conversation marked as important' });
	} else if (req.body.type === 'unmark') {
		res.send({ message: 'conversation un marked as important' });
	} else {
		res.send({ message: 'conversation un marked as important' });
	}
	res.send({});
});

app.get('/messages/:messageid', (req, res) => {
	const messageid = req.params.messageid;
	let rawdata;
	let parsedObj;
	try {
		rawdata = fs.readFileSync(`server/json/messages/${messageid}.json`);
		parsedObj = JSON.parse(rawdata);
	} catch (ex) {
		rawdata = fs.readFileSync(`server/json/messages/default.json`);
		parsedObj = JSON.parse(rawdata);
	}
	res.send(parsedObj);
});

app.delete('/messages/:messageid', (req, res) => {
	const messageid = req.params.messageid;
	res.send({ message: 'email deleted' });
});

app.get('/contacts', (req, res) => {
	let rawdata = fs.readFileSync(`server/json/contacts.json`);
	let parsedObj = JSON.parse(rawdata);
	res.send(parsedObj);
});

app.get('/filters', (req, res) => {
	let rawdata = fs.readFileSync(`server/json/filters.json`);
	let parsedObj = JSON.parse(rawdata);
	res.send(parsedObj);
});

app.get('/settings', (req, res) => {
	let rawdata = fs.readFileSync(`server/json/settings.json`);
	let parsedObj = JSON.parse(rawdata);
	res.send(parsedObj);
});
