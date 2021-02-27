import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class NpsController {

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detrator = surveysUsers.filter((survey) =>
            survey.value >= 0 && survey.value <= 0
        ).length;

        const promoters = surveysUsers.filter((survey) =>
            survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveysUsers.filter((survey) =>
            survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswer = surveysUsers.length;
        const calculate = Number((((promoters - detrator) / totalAnswer) * 100).toFixed(2));

        return response.json({
            detrator,
            promoters,
            passive,
            totalAnswer,
            nps: calculate
        })
    }

}

export { NpsController }