export class Contact {

    idContact!: number;
    nameContact!: string;
    emailContact!: string;
    favoriteContact!: boolean;

    constructor(nameContact: string, emailContact: string) {
        this.nameContact = nameContact;
        this.emailContact = emailContact;
    }
}