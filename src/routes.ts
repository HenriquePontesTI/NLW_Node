import { Router } from 'express';
import { SendMailController } from './controller/SendMailController';

import { SurveyController } from './controller/SurveyController';
import { UserController } from './controller/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/sendMail", sendMailController.execute);
//router.put("/answers", sendMailController.execute);

export { router }