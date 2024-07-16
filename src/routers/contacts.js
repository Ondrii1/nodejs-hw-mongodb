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
import { authenticate } from '../middlewares/authenticate.js';


const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController) );

router.get('/:contactId',validateMongoId, ctrlWrapper(getContactsByIdController));

router.post('',validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId',validateMongoId, ctrlWrapper(deleteContactController));

router.put('/:contactId',validateMongoId, validateBody(createContactSchema), ctrlWrapper(updateContactController));

router.patch('/:contactId',validateMongoId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

 export default router;