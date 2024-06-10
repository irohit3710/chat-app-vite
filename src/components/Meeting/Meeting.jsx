import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import React, { useEffect, useState } from 'react'
import { generateMeetingId } from '../Helper/custome.helper';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import { BASE_URL } from '../../Context/helper';
import { useNavigate, useParams } from 'react-router';

const Meeting = (name = 'Test1') => {

	const [jwtToken, setJwtToken] = useState();
	const [error, setError] = useState(null);
	const [participants, setParticipants] = useState([]);

	const navigate = useNavigate();

	const meetingRoomId = useParams();
	console.log("meetingRoomId : ", meetingRoomId.meetingId);


	const { user } = ChatState();
	// console.log('user : ',user);

	const token = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(
				`${BASE_URL}/api/user/jitsi?name=${user.name}&email=${user.email}.com&id=${user._id}}`,
				config
			);

			console.log("data : ", data);
			setJwtToken(data);
		} catch (error) {
			console.error("Error fetching token: ", error);
			setError('Failed to retrieve token. Please try again.');
		}
	}

	const handleApiReady = (externalApi) => {
		externalApi.addEventListener('participantJoined', (participant) => {
			setParticipants((prev) => [...prev, participant]);
			if (participants.length === 0) {
				// Set the first participant as the moderator
				externalApi.executeCommand('moderator', participant.displayName);
			}
		});

		externalApi.addEventListener('participantLeft', (participant) => {
			setParticipants((prev) => prev.filter((p) => p.id !== participant.id));
		});
	};

	useEffect(() => {
		token();
	}, [])
	return (
		<>
			<div>Meeting</div>
			<JaaSMeeting
				// domain={YOUR_DOMAIN}
				appId='vpaas-magic-cookie-b9f2d397120a469182119b0903dac4ac'
				roomName={meetingRoomId.meetingId}
				jwt={jwtToken}
				configOverwrite={{
					startWithAudioMuted: true,
					disableModeratorIndicator: false,
					startScreenSharing: true,
					enableEmailInStats: true
				}}
				interfaceConfigOverwrite={{
					DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
					VIDEO_LAYOUT_FIT: 'nocrop',
					MOBILE_APP_PROMO: false,
					TILE_VIEW_MAX_COLUMNS: 4
				}}
				// userInfo={{
				// 	displayName: 'Test'
				// }}
				onApiReady={handleApiReady}
				getIFrameRef={(iframeRef) => { iframeRef.style.height = '100vh'; }}
				onReadyToClose={()=>{navigate('/chats')}}
			/>
		</>
	)
}

export default Meeting