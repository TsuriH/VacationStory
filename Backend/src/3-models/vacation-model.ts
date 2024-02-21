import {UploadedFile} from "express-fileupload"

import Joi from "joi"

class VacationModel {
    public id: number;
    public country: string;
    public description: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile
    public dates: string;

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.country = vacation.country;
        this.description = vacation.description;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image =vacation.image;
        this.dates = vacation.dates;

    }

    private static validationScheme = Joi.object({
        id: Joi.number().integer().optional(),
        country: Joi.string().max(20).required(),
        description: Joi.string().max(20).required(),
        price: Joi.number().max(20).required(),
        imageName: Joi.string().max(20).optional(),
        image: Joi.optional(),
        dates: Joi.string().max(20).required(),
    })

    public validate() {
        const result = VacationModel.validationScheme.validate(this)
        return result.error?.message
    }

    
}

export default VacationModel