import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing); // now create listing.controller.js. // verifyToken coz-> we have to check that the person is authenticated or not.
router.delete('/delete/:id', verifyToken, deleteListing); //Route for delete functionality.....when we click delete on the profile page....after that the listing should be deleted // verifyToken coz-> we have to check that the person is authenticated or not.

export default router;