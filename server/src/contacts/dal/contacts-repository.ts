import mongoose, {DocumentQuery} from "mongoose";
import Contact, {I_mongooseContactModel} from './models/Contact';
import { I_mongooseContactData, I_contactCommonData } from "../../../../core/contacts-types";

export const contactsRepository = {
    async addContact(contact: I_contactCommonData): Promise<I_mongooseContactData | never> {
        try {
            const newContact = await new Contact({
                firstName: contact.firstName,
                lastName: contact.lastName,
                address: contact.address,
                city: contact.city,
                region: contact.region,
                country: contact.country,
                postalCode: contact.postalCode,
                phone: contact.phone,
                email: contact.email,
                age: +contact.age
            }).save();
            return new Promise(((resolve, reject) => resolve
            (newContact.getFullDataToSend())))
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    getContacts(): DocumentQuery<I_mongooseContactModel[], I_mongooseContactModel> & {} {
        return Contact.find();
    },

    async updateContact(newContactInfo: I_mongooseContactData): Promise<I_mongooseContactData> {
        try {
            return await Contact.update({_id: newContactInfo.id}, newContactInfo)
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    async deleteContact(contactId: string): Promise<any> {
        try {
            return Contact.deleteOne({_id: contactId});
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },
};