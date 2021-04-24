class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public image: string,
    public title: string,
    public chatNotification: boolean
  ) {}
}

export default User;
