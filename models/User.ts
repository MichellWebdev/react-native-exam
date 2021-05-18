class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public image: string,
    public studyProgramme: string,
    public chatNotification: boolean,
    public documentKey: string
  ) { }
}

export default User;
