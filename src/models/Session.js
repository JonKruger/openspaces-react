export default class Session {
  constructor() {
    this.id = null;
    this.title = '';
    this.owner = '';
    this.twitterHandle = '';
    this.timeSlotId = null;
    this.meetingSpaceId = null;
  }

  get twitterUrl() {
    return `http://twitter.com/${encodeURIComponent(this.twitterHandle)}`;
  }
}