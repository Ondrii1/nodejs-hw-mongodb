import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
// import { getAllContacts, getContactById } from './services/contacts.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();
  // const PORT = 3000(process.env.PORT);
  const PORT = Number(env('PORT', '3000'));

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  //   next();
  // });

  // app.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });

  // app.get('/contacts', async (req, res) => {
  //   const contacts = await getAllContacts();
  //   res.status(200).json({
  //     message: 'Successfully found contacts!',
  //     data: contacts,
  //   });
  // });

  // app.get('/contacts/:id', async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const contact = await getContactById(id);

  //     if (!contact) {
  //       return res.status(404).json({
  //         status: 404,
  //         message: `Not Found`,
  //       });
  //     }

  //       app.use('*', (req, res, next) => {
  // res.status(404).json({
  //     message: 'Not found',
  //   });
  //       });

  //       app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });

  //     res.status(200).json({
  //       message: `Successfully found contact with id ${id}!`,
  //       data: contact,
  //     });
  //   } catch (error) {
  //     console.error('Error getting contact:', error);
  //     res.status(500).json({
  //       status: 500,
  //       message: 'Internal Server Error',
  //     });
  //   }
  // });

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};







// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
// import { getAllContacts, getContactById } from './services/contacts.js';
// import mongoose from 'mongoose';

// export const setupServer = () => {
//   const PORT = 3000;

//   const app = express();

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );

//   app.use(cors());

//   app.get('/contacts', async (req, res) => {
//     const contacts = await getAllContacts();
//     res.status(200).json({
//       message: 'Successfully found contacts!',
//       data: contacts,
//     });
//   });

//   app.get('/contacts/:contactId', async (req, res, next) => {
//     const { contactId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(contactId)) {
//       return res.status(404).json({
//         data: 'ID not found',
//       });
//     }

//     try {
//       const contact = await getContactById(contactId);
//       if (!contact) {
//         return res.status(404).json({
//           message: `Contact with id ${contactId} not found!`,
//         });
//       }
//       res.status(200).json({
//         message: `Successfully found contact with id ${contactId}!`,
//         data: contact,
//       });
//     } catch (err) {
//       next(err);
//     }
//   });

//   app.use('*', (req, res, next) => {
//     res.status(404).json({
//       message: 'Not found',
//     });
//   });

//   app.use((err, req, res, next) => {
//     res.status(500).json({
//       message: 'Server Error',
//       error: err.message,
//     });
//   });

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };