import Schedule from "./Schedule";
import User from "./User";

class Event {
    constructor(
        public id: string,
        public eventName: string,
        public groupName: string,
        public image: string,
        public startDate: Date,
        public endDate: Date,
        public locaion: string,
        public description: string,
        public schedule: Schedule[],
        public interested: User[],
        public going: User[]
    ) { }
}

export default Event;
