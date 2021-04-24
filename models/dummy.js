import * from "../models/";

export const USERS = [
    new User('1', 'Felix Sandgren', 'felix@sandgren.dk', 'MSc in Medicine', true),
    new User('2', 'Thomas Nielsen', 'thomas@nielsen.dk', 'MSc2 in Medicine', false)
    new User('3', 'User 3', 'user3@email.com', 'BA in IT', false)
    new User('4', 'User 4', 'abc@email.com', 'BA in Architecture', true)
]

export const EVENTS = [
    new Event('Event 1', 'Group 1', '../assets/discoverbox1.jpg', new Date(2021, 04, 01, 12, 30), new Date(2021, 04, 02, 14, 00), 'Copenhagen',
        'This is a sample event 1 from group 1.', [], [USER[0], USER[1]], [USER[0]]),
    new Event('Event 2', 'Group 2', '../assets/discoverbox1.jpg', new Date(2021, 04, 13, 15, 30), new Date(2021, 04, 16, 12, 00), 'Korea',
        'Event 2 from group 2.', [], [USER[0], USER[1], USER[2]], [USER[1], USER[2]])
];
