export class JwtResponse {
    id:          number;
    username:    string;
    email:       string;
    roles:       string[];
    accessToken: string;
    tokenType:   string;
    imageUrl; string;

    constructor(id:number,username:string,email:string,roles:string[], accessToken:string,tokenType:string,imageUrl:string){
        this.id = id
        this.username = username
        this.email = email;
        this.roles =  roles;
        this.accessToken =  accessToken;
        this.tokenType = tokenType;
        this.imageUrl = imageUrl; 
    }
}