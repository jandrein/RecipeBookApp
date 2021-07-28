import { Injectable } from "@angular/core"

Injectable
interface user{
    email: string,
    uid: string
}

@Injectable()
export class UserService{
    private user: user
  name: any
  uid: any
  password: string


    cost (){

    }

    setUser(user: user){
        this.user = user
    }

    getUID(){
        return this.user.uid
    }
}