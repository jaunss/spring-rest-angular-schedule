export class Contact {

    idContact!: number;
    nameContact!: string;
    emailContact!: string;
    favoriteContact!: boolean;
    photoContact!: any;

    constructor(nameContact: string, emailContact: string) {
        this.nameContact = nameContact;
        this.emailContact = emailContact;
    }
}