const { body, validationResult } = require("express-validator");
const model = require("./model");
const { async } = require("q");

const data_validation = async (request_data) => {
    await body("title")
        .not()
        .isEmpty()
        .withMessage("the title field is required")
        .run(request_data);
    await body("short_description")
        .not()
        .isEmpty()
        .withMessage("the short_description field is required")
        .run(request_data);
    await body("long_description")
        .not()
        .isEmpty()
        .withMessage("the long_description field is required")
        .run(request_data);
    //  console.log("body data",body("title") );
    let result = validationResult(request_data);
    return {
        errors: result.array(),
        hasError: result.isEmpty() ? false : true,
    };
};

module.exports = async (data) => {
    console.log('from user role store model', data);
    let check = await data_validation({ body: data });
    if (check.hasError) {
        return {
            status: 'failed',
            data: check.errors,
            message: "validation error",
            status_code: 422,
        }
    }

    try {
        const new_data = await model.create(data);
        return {
            status: 'success',
            data: new_data,
            message: "data inserted successfully",
            status_code: 201,
        };
    } catch (error) {
        return {
            status: 'failed',
            data: error,
            message: error.message,
            status_code: 409,
        }
    }
}