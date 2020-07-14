import React, { Component } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './VideoPage.css';
import './VideoPage.css';
//import getToken from "./TwilioApi";

export default class VideoPage extends Component {
  constructor() {
    super();
    this.state = {
      identity: null,
      roomName: '',
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: '' // Track the current active room
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.roomJoined2 = this.roomJoined2.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    //this.detachTracks = this.detachTracks.bind(this);
    //this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
  }

  handleRoomNameChange(e) {
    let roomName = e.target.value;
    this.setState({ roomName });
  }

  joinRoom() {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

    console.log("Joining room '" + this.state.roomName + "'...");
    let connectOptions = {
      name: this.state.roomName
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(this.state.token, connectOptions).then(this.roomJoined2, error => {
      alert('Could not connect to Twilio: ' + error.message);
    });
  }

  roomJoined2(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });
    // Log your Client's LocalParticipant in the Room
    const localParticipant = room.localParticipant;
    console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

    // Log any Participants already connected to the Room
    room.participants.forEach(participant => {
      console.log(`Participant "${participant.identity}" is connected to the Room`);
    });

    // Log new Participants as they connect to the Room
    room.once('participantConnected', participant => {
      console.log(`Participant "${participant.identity}" has connected to the Room`);
    });

    // Log Participants as they disconnect from the Room
    room.once('participantDisconnected', participant => {
      console.log(`Participant "${participant.identity}" has disconnected from the Room`);
    });
    room.on('participantConnected', participant => {
      console.log(`Participant connected: ${participant.identity}`);
    });
    
    room.on('participantDisconnected', participant => {
      console.log(`Participant disconnected: ${participant.identity}`);
    });
    var localPreviewContainer = this.refs.localMedia;
    var remotePreviewContainer = this.refs.remoteMedia;

    room.once('participantConnected', participant => {
      console.log(`Participant "${participant.identity}" connected`);
    
      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          const track = publication.track;
          remotePreviewContainer.appendChild(track.attach());
        }
      });
    
      participant.on('trackSubscribed', track => {
        remotePreviewContainer.appendChild(track.attach());
      });
    });
  }
  
  componentDidMount() {
    axios.get('http://localhost:3500/api/token').then(results => {
      const { identity, token } = results.data;
      this.setState({ identity, token });
    });
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }

  render() {
    // Only show video track after user has joined a room
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        <div ref="localMedia" />
      </div>
    ) : (
        ''
      );
    // Hide 'Join Room' button if user has already joined a room.
    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <button label="Leave Room" onClick={this.leaveRoom} >Leave Room</button>
    ) : (
        <button label="Join Room" onClick={this.joinRoom} >Join Room</button>
      );
    const { siteTwitterHandle } = config;

    // prettier-ignore
    return (
      <StaticPage
        title="Video"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'VideoPage',
          description: 'Video',
          name: 'Video page',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>

          <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className="flex-container">
                {showLocalTrack}
                <div className="flex-item">
                  <input
                    placeholder="Room Name"
                    onChange={this.handleRoomNameChange}
                  />
                  <br />
                  {joinOrLeaveRoomButton}
                </div>
                <div className={css.video} ref="remoteMedia" id="remote-media" />
              </div>
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }
};