import DiscoverEvent from '../models/DiscoverEvent'
import User from '../models/User'
import { event1, event2 } from '../assets/Assets'

export const USERS = [
    new User('1', 'Felix Sandgren', 'felix@sandgren.dk', '', 'MSc in Medicine', true),
    new User('2', 'Thomas Nielsen', 'thomas@nielsen.dk', '', 'MSc2 in Medicine', false),
    new User('3', 'User 3', 'user3@email.com', '', 'BA in IT', false),
    new User('4', 'User 4', 'abc@email.com', '', 'BA in Architecture', true),
]

export const EVENTS = [
    new DiscoverEvent('1', 'Event 1', 'Group 1', event1, '2021.04.12 13:00', '2021.04.14 11:30', 'Copenhagen', 'This is a sample event 1 from group 1.', [], [USERS[0], USERS[1]], [USERS[0]]),
    new DiscoverEvent('2', 'Event 2', 'Group 2', event2, '2021.04.12 13:00', '2021.04.14 11:30', 'Korea', 'Event 2 from group 2.', [], [USERS[0], USERS[1], USERS[2]], [USERS[1], USERS[2]])
];
