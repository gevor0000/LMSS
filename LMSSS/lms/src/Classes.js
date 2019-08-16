let Rolless=[];
let Usernames=[];
let Passwords=[];
let Rolles=["User", "Admin", "Librarian"];
class User{

    constructor(Username, Password, Roll) {
        if(Usernames.includes(Username)){
            alert("The username is taken");
        }
        else {
            this.username = Username;
            this.password = Password;
            this.rolll = Roll;
             Usernames=JSON.parse(localStorage.getItem("Usernames"));
             Passwords=JSON.parse(localStorage.getItem("Passwords"));
             Rolless=JSON.parse(localStorage.getItem("Rolls"));
             Usernames.push(Username);
             Passwords.push(Password);
             Rolless.push(Roll.roll);
             localStorage.setItem("Usernames", JSON.stringify(Usernames));
             localStorage.setItem("Passwords", JSON.stringify(Passwords));
             localStorage.setItem("Rolls", JSON.stringify(Rolless));
        }
    }
}

class Roll{
    constructor(Roll){
        if (Rolles.includes(Roll)){
            this.roll=Roll;
        }
        else {
            return "Invalid Roll";
        }
    }
}

