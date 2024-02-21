import Joi from "joi"

class VacationUserFollowModel {
    public userId: number;
    public vacationId: number;

    public constructor(vacationUserFollow: VacationUserFollowModel) {
        this.userId = vacationUserFollow.userId;
        this.vacationId = vacationUserFollow.vacationId
    }

    private static vacationUserFollowScheme = Joi.object({
        userId: Joi.number().integer().required,
        vacationId: Joi.number().integer().required
    })

    public validate() {
        const result = VacationUserFollowModel.vacationUserFollowScheme.validate(this);
        return result.error?.message
    }

}

export default VacationUserFollowModel