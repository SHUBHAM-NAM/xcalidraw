import { jwt } from 'jsonwebtoken';
import { Request } from 'express';
import { WebSocketServer } from "ws";
import { JWT_SECRET } from '@repo/backendcommon/config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req: Request) => {
    const url = req.url;

    if (!url) {
        return;
    }

    const queryparams = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '');
    const token = queryparams.get('token');

    if (!token) {
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded ) {
            ws.close();
            return;

        }
    } catch {
        return;
    }

    ws.send('welcome');
    ws.on('message', (data) => {
        console.log('data', data);
    });
});