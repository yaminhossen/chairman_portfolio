const { body, validationResult } = require("express-validator");
const model = require("./model");
const { async } = require("q");
var fs = require('fs-extra')
const { dirname } = require('path');
const { log } = require("console");
const appDir = dirname(require.main.filename);

const data_validation = async (request_data) => {
    await body("title")
        .not()
        .isEmpty()
        .withMessage("the title field is required")
        .run(request_data);
    // await body("subtitle")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the subtitle field is required")
    //     .run(request_data);
    await body("short_description")
        .not()
        .isEmpty()
        .withMessage("the short_description field is required")
        .run(request_data);
    await body("description")
        .not()
        .isEmpty()
        .withMessage("the description field is required")
        .run(request_data);
    // await body("photo_alt_text")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the photo_alt_text field is required")
    //     .run(request_data);
    // await body("seo_title")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the seo_title field is required")
    //     .run(request_data);
    // await body("seo_keyword")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the seo_keyword field is required")
    //     .run(request_data);
    // await body("seo_description")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the seo_description field is required")
    //     .run(request_data);
    // await body("seo_schema_tags")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the seo_schema_tags field is required")
    //     .run(request_data);
    await body("published_date")
        .not()
        .isEmpty()
        .withMessage("the published_date field is required")
        .run(request_data);


    let result = validationResult(request_data);
    return {
        errors: result.array(),
        hasError: result.isEmpty() ? false : true,
    };
};


module.exports = async (datas) => {
    let data = datas.body;
    let files = datas.files;

    console.log('files form frontend', files)

    const upload_files = (file, id) => {
        let file_name = parseInt(Math.random() * 1000) + id + file.name;
        const path = appDir + "/public/uploads/posts/" + file_name;
        fs.move(file.path, path, function (err) {
            if (err) return console.error(err)
            console.log("success!")
        })
        photo_path = "uploads/posts/" + file_name;
        return photo_path;
    }

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
        

        const model_data = await model.findOne({ _id: data.id });
        // console.log('yamin2',model_data);
        // var photo_path = model_data.photo;
        
        if (files?.photo && files.photo.size > 0) {
            photo_path = upload_files(files?.photo, data.title);
            model_data.photo = photo_path;
            console.log('form photo_path',photo_path);
        }
        model_data.title = data.title;
        model_data.subtitle = data.subtitle;
        model_data.short_description = data.short_description;
        model_data.description = data.description;
        
        model_data.photo_alt_text = data.photo_alt_text;
        model_data.seo_title = data.seo_title;
        model_data.seo_keyword = data.seo_keyword;
        model_data.seo_description = data.seo_description;
        model_data.seo_schema_tags = data.seo_schema_tags;
        model_data.url = data.url;
        model_data.published_date = data.published_date;
        await model_data.save();
        // console.log(data);
        return {
            status: 'success',
            data: model_data,
            message: "data updated successfully",
            status_code: 201,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'failed',
            data: error,
            message: error.message,
            status_code: 500,
        }
    }

}