import React, { useState } from 'react'
import VideoChat from './VideoChat';

const Test = () => {

    const [room, setRoom] = useState('');
    const [inRoom, setInRoom] = useState(false);

    const joinRoom = () => {
        if (room !== '') {
            setInRoom(true);
        }
    };

    const leaveRoom = () => {
        setInRoom(false);
        setRoom('');
    };

    return (
        <div>
        {!inRoom ? (
            <div>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Enter room name"
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
        ) : (
            <div>
                <h2>Room: {room}</h2>
                <button onClick={leaveRoom}>Leave Room</button>
                <VideoChat room={room} />
            </div>
        )}
    </div>
    )
}

export default Test