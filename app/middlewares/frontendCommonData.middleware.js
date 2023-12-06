const blogCategoriesModel = require("../api/blog/blog_categories/model/model")
const tagsModel = require("../api/tag/tags/model/model")
const userContactNumbersModel = require("../api/user_contact_numbers/model/model")
const userSocialLinksModel = require("../api/user_social_links/model/model")
const userEmailsModel = require("../api/user_emails/model/model")
const userContactMessagesModel = require("../api/contact_message/contact_messages/model/model")
const userSettingTitlesModel = require("../api/setting/setting_titles/model/model")
const settingModel = require("../api/setting/setting_titles/model/model");
module.exports = async (server, req) => {
    let blog_category = await blogCategoriesModel.find();
    let tags = await tagsModel.find();
    let contact_numbers = await userContactNumbersModel.find();
    let emails = await userEmailsModel.find();
    let social_links = await userSocialLinksModel.find();
    let contact_message = await userContactMessagesModel.find();
    let address = await userSettingTitlesModel.find();
    let setting_titles = await settingModel.findOne({ title: "logo" });
    server.locals.commonData = {
        blog_category,
        tags,
        contact_numbers,
        emails,
        social_links,
        contact_message,
        address,
        setting_titles,

    };

    server.locals = {
        ...server.locals,
        
        seo_title: 'razibur rahman',
        seo_keyword: 'razibur rahman',
        seo_schematags: 'razibur rahman',
        seo_description: 'razibur rahman',
        seo_image: 'razibur rahman',

    }

}