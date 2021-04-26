import DiscoverEvent from '../models/DiscoverEvent'
import DiscoverStudOrg from '../models/DiscoverStudOrg'
import User from '../models/User'
import Schedule from '../models/Schedule'
import { event1, event2, studOrg1, studOrg2 } from '../assets/Assets'

export const USERS = [
    new User('1', 'Felix Sandgren', 'felix@sandgren.dk', '', 'MSc in Medicine', true),
    new User('2', 'Thomas Nielsen', 'thomas@nielsen.dk', '', 'MSc2 in Medicine', false),
    new User('3', 'User 3', 'user3@email.com', '', 'BA in IT', false),
    new User('4', 'User 4', 'abc@email.com', '', 'BA in Architecture', true),
]

export const SCHEDULES = [
    new Schedule('1', '2021.04.12 13:00', 'Welcome and snacks'),
    new Schedule('2', '2021.04.12 14:00', 'Presentation'),
    new Schedule('3', '2021.04.12 15:00', 'Party and drinks'),
    new Schedule('4', '2021.04.12 17:00', 'Goodbye'),
    new Schedule('5', '2021.04.13 13:00', 'Welcome'),
    new Schedule('6', '2021.04.13 14:00', 'Speach'),
    new Schedule('7', '2021.04.13 16:00', 'Goodbye')
]

export const EVENTS = [
    new DiscoverEvent('1', 'Event 1', 'Group 1', event1, '2021.04.12 13:00', '2021.04.12 17:00', 'Copenhagen', 'This is a sample event 1 from group 1.', [SCHEDULES[0], SCHEDULES[1], SCHEDULES[2], SCHEDULES[3]], [USERS[0], USERS[1]], [USERS[0]]),
    new DiscoverEvent('2', 'Event 2', 'Group 2', event2, '2021.04.13 13:00', '2021.04.14 11:30', 'Korea', 'Event 2 from group 2.', [SCHEDULES[4], SCHEDULES[5], SCHEDULES[6]], [USERS[0], USERS[1], USERS[2]], [USERS[1], USERS[2]])
];

export const STUDORGS = [
    new DiscoverStudOrg('1', 'DANSIC - Danish Social Innovation Club', studOrg1, 'Here at DANSIC, we know that sometimes all it takes to change the world is a little support. Since our founding in 2011, we have been determined to make an impact.', 'abc@abc.com', [USERS[0]]),
    new DiscoverStudOrg('2', 'CBS Jam', studOrg2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'test@test.com', [USERS[0], USERS[3]])
]
