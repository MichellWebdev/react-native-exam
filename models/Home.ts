import DiscoverEvent from './DiscoverEvent';
import DiscoverStudentOrg from './DiscoverStudOrg';

class HomeData {
  constructor(public id: string, public event: DiscoverEvent[], public studentOrg: DiscoverStudentOrg[]) {}
}

export default HomeData;
