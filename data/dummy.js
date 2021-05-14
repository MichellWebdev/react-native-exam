import DiscoverEvent from '../models/DiscoverEvent';
import DiscoverStudOrg from '../models/DiscoverStudOrg';
import HomeData from '../models/Home';
import User from '../models/User';
import Schedule from '../models/Schedule';
import ChatRoom from '../models/ChatRoom';
import ChatMessage from '../models/ChatMessage';
import { event1, event2, event3, event4, studOrg1, studOrg2, chatroom1, chatroom2 } from '../assets/Assets';

export const USERS = [
  new User('1', 'Felix Sandgren', 'felix@sandgren.dk', '', 'MSc in Medicine', true),
  new User('2', 'Thomas Nielsen', 'thomas@nielsen.dk', '', 'MSc2 in Medicine', false),
  new User('3', 'User 3', 'user3@email.com', '', 'BA in IT', false),
  new User('4', 'User 4', 'abc@email.com', '', 'BA in Architecture', true),
];

export const SCHEDULES = [
  new Schedule('1', new Date(2021, 3, 12, 13, 0, 0), 'Welcome and snacks'),
  new Schedule('2', new Date(2021, 3, 12, 14, 0, 0), 'Presentation'),
  new Schedule('3', new Date(2021, 3, 12, 15, 0, 0), 'Party and drinks'),
  new Schedule('4', new Date(2021, 3, 12, 17, 0, 0), 'Goodbye'),
  new Schedule('5', new Date(2021, 3, 13, 13, 0, 0), 'Welcome'),
  new Schedule('6', new Date(2021, 3, 13, 14, 0, 0), 'Speach'),
  new Schedule('7', new Date(2021, 3, 13, 16, 0, 0), 'Goodbye'),
];

export const EVENTS = [
  new DiscoverEvent(
    '1',
    'Summer with CBS Yoga',
    'CBS Yoga',
    event1,
    new Date(2021, 3, 12, 13, 0, 0),
    new Date(2021, 3, 13, 17, 0, 0),
    'Dalgas Have, 2000 Frederiksberg',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia cum eius ipsam, rerum commodi reiciendis illo explicabo ratione error tenetur ex laborum iusto a excepturi!',
    [SCHEDULES[0], SCHEDULES[1], SCHEDULES[2], SCHEDULES[3]],
    [USERS[0], USERS[1]],
    [USERS[0]]
  ),
  new DiscoverEvent(
    '2',
    'CBS Film presents: Ghost World',
    'CBS Film',
    event2,
    new Date(2021, 3, 13, 13, 0, 0),
    new Date(2021, 3, 13, 16, 0, 0),
    'Korea',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia cum eius ipsam, rerum commodi reiciendis illo explicabo ratione error tenetur ex laborum iusto a excepturi! Reiciendis illo explicabo ratione error tenetur ex laborum iusto a excepturi.',
    [SCHEDULES[4], SCHEDULES[5], SCHEDULES[6]],
    [USERS[0], USERS[1], USERS[2]],
    [USERS[1], USERS[2]]
  ),
  new DiscoverEvent(
    '3',
    'CBS Art at Lousiana',
    'CBS Art',
    event3,
    new Date(2021, 4, 28, 12, 0, 0),
    new Date(2021, 4, 28, 16, 0, 0),
    'Gl Strandvej 13, 3050 Humlebæk',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia cum eius ipsam, rerum commodi reiciendis illo explicabo ratione error tenetur ex laborum iusto a excepturi! Error tenetur ex laborum.',
    [SCHEDULES[0], SCHEDULES[1], SCHEDULES[2], SCHEDULES[3]],
    [USERS[0], USERS[1]],
    [USERS[0]]
  ),
  new DiscoverEvent(
    '4',
    'CBS Film presents: Oldboy',
    'CBS Film',
    event4,
    new Date(2021, 5, 5, 12, 0, 0),
    new Date(2021, 5, 5, 16, 0, 0),
    'Korea',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia cum eius ipsam, rerum commodi reiciendis illo explicabo ratione error tenetur ex laborum iusto a excepturi!',
    [SCHEDULES[4], SCHEDULES[5], SCHEDULES[6]],
    [USERS[0], USERS[1], USERS[2]],
    [USERS[1], USERS[2]]
  ),
];

export const STUDORGS = [
  new DiscoverStudOrg(
    '1',
    'DANSIC - Danish Social Innovation Club',
    event1,
    studOrg1,
    'Here at DANSIC, we know that sometimes all it takes to change the world is a little support. Since our founding in 2011, we have been determined to make an impact.',
    'abc@abc.com',
    [USERS[0]]
  ),
  new DiscoverStudOrg(
    '2',
    'CBS Jam',
    event2,
    studOrg2,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'test@test.com',
    [USERS[0], USERS[3]]
  ),
];

export const HOME = [new HomeData('1', [EVENTS[0]]), new HomeData('2', [STUDORGS[1]])];

export const CHATROOMS = [
  new ChatRoom('1', 'CBS Surf', [USERS[0], USERS[1]], chatroom1, new Date(2021, 3, 12, 10, 10, 12)),
  new ChatRoom('2', 'Book Readers', [USERS[1], USERS[2]], chatroom2, new Date(2021, 3, 13, 8, 21, 0)),
  new ChatRoom('3', 'Study Group', [USERS[0], USERS[2]], chatroom2, new Date(2021, 3, 20, 16, 10, 3)),
];

export const CHATMESSAGES = [
  new ChatMessage('1', '1', USERS[0], 'Hi!', new Date(2021, 3, 20, 13, 4, 2)),
  new ChatMessage('2', '1', USERS[1], 'Hello! How are you?', new Date(2021, 3, 20, 13, 11, 20)),
  new ChatMessage('3', '2', USERS[2], 'Hello, this is User 3', new Date(2021, 3, 13, 15, 1, 23)),
  new ChatMessage('4', '3', USERS[2], 'Are you studying?', new Date(2021, 4, 1, 10, 46, 44)),
];
