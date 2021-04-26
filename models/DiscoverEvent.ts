import Schedule from "./Schedule";
import User from "./User";

class DiscoverEvent {
    constructor(
        public id: string,
        public eventName: string,
        public groupName: string,
        public image: string,
        public startDate: Date,
        public endDate: Date,
        public location: string,
        public description: string,
        public schedules: Schedule[],
        public interested: User[],
        public going: User[]
    ) { }
}

export default DiscoverEvent;
