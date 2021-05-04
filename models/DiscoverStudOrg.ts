import User from '../models/User';

class DiscoverEvent {
  constructor(
    public id: string,
    public orgName: string,
    public orgImage: string,
    public orgProfileImage: string,
    public description: string,
    public contactInfo: string,
    public followers: User[]
  ) {}
}

export default DiscoverEvent;
