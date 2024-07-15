import { Router } from 'express';
import {
    getContactsByIdController,
    getContactsController,
    createContactController,
    deleteContactController,
    updateContactController,
    patchContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController) );

router.get('/contacts/:contactId',validateMongoId, ctrlWrapper(getContactsByIdController));

router.post('/contacts',validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId',validateMongoId, ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId',validateMongoId, validateBody(createContactSchema), ctrlWrapper(updateContactController));

router.patch('/contacts/:contactId',validateMongoId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

 export default router;