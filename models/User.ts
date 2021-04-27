class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public image: string,
    public studyProgramme: string,
    public chatNotification: boolean
  ) {}
}

export default User;
