import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:8000');

const VideoChat = ({ room }) => {
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socket.emit('join', room);

            socket.on('new-user', userId => {
                const peer = createPeer(userId, socket.id, stream);
                peersRef.current.push({
                    peerID: userId,
                    peer,
                });
                setPeers([...peersRef.current]);
            });

            socket.on('signal', data => {
                const item = peersRef.current.find(p => p.peerID === data.from);
                if (item) {
                    item.peer.signal(data.signal);
                } else {
                    const peer = addPeer(data.signal, data.from, stream);
                    peersRef.current.push({
                        peerID: data.from,
                        peer,
                    });
                    setPeers([...peersRef.current]);
                }
            });

            socket.on('user-left', userId => {
                const peerObj = peersRef.current.find(p => p.peerID === userId);
                if (peerObj) {
                    peerObj.peer.destroy();
                }
                const peersLeft = peersRef.current.filter(p => p.peerID !== userId);
                peersRef.current = peersLeft;
                setPeers(peersLeft);
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on('signal', signal => {
            socket.emit('signal', { room, data: { signal, from: callerID, to: userToSignal } });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on('signal', signal => {
            socket.emit('signal', { room, data: { signal, from: socket.id, to: callerID } });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    const handleEndCall = () => {
        socket.emit('leave', room);
        setPeers([]);
    };

    return (
        <div>
            <div>
                <video ref={userVideo} autoPlay muted style={{ width: '300px' }} />
                {peers.map((peer, index) => {
                    return <Video key={index} peer={peer.peer} />;
                })}
            </div>
            <button onClick={handleEndCall}>End Call</button>
        </div>
    );
};

const Video = ({ peer }) => {
    const ref = useRef();

    useEffect(() => {
        peer.on('stream', stream => {
            ref.current.srcObject = stream;
        });
    }, [peer]);

    return <video ref={ref} autoPlay style={{ width: '300px' }} />;
};

export default VideoChat;
