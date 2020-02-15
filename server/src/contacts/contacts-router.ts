import {contactsRepository} from "./dal/contacts-repository";
import express, {NextFunction, Request, Response} from "express";
const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let contacts = await contactsRepository.getContacts();
        return res.status(200).json(contacts.map(c => c.toClient()))
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contact = req.body;
        await contactsRepository.addContact(contact);
        return res.status(201).json({
            message: 'Created Successful'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.id;
        await contactsRepository.deleteContact(contactId);
        return res.status(201).json({
            message: 'Deleted Successful'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.put('/', async (req: Request, res: Response) => {
        try {
            let newContactInfo = req.body;
            let updated = await contactsRepository.updateContact(newContactInfo);
            res.status(201).send(updated)
        } catch (err) {
            res.status(402).send(err)
        }
    });

export default router;