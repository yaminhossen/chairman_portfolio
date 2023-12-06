let ObjectId = require('mongodb').ObjectId;

const blogModel = require("../../models/blog.model");
const categoryModel = require("../../models/category.model");
const uesrProfileInfosModel = require("../../api/user_profile_infos/model/model")
const uesrEducationModel = require("../../api/user_educations/model/model")

const photoGalleryCategoriyModel = require("../../api/photo_gallery/photo_gallery_categories/model/model")

const videoGalleryCategoriyModel = require("../../api/video_gallery/video_gallery_categories/model/model")
const videoGalleryVideoModel = require("../../api/video_gallery/video_gallery_images/model/model")

const tagsModel = require("../../api/tag/tags/model/model")
const userContactNumbersModel = require("../../api/user_contact_numbers/model/model")
const userSocialLinksModel = require("../../api/user_social_links/model/model")
const userEmailsModel = require("../../api/user_emails/model/model")
const userContactMessagesModel = require("../../api/contact_message/contact_messages/model/model")

const userSettingTitlesModel = require("../../api/setting/setting_titles/model/model")
const blogCategoriesModel = require("../../api/blog/blog_categories/model/model")
const blogsModel = require("../../api/blog/blogs/model/model");
const bannerModel = require("../../api/banner/banners/model/model");
const settingModel = require("../../api/setting/setting_titles/model/model");
const blogCommentModel = require("../../api/blog/blog_comments/model/model");
const contactModel = require("../../api/contact_message/contact_messages/model/model")

const { async } = require("q");
const controllers = {
	folder_prefix: ``,
	route_prefix: ``,
	server: null,

	home: async function (req, res) {
		let blogs = await blogModel.find().populate('creator').populate('category');
		let categories = await categoryModel.find();

		return res.render(`home`, {
			blogs,
			categories,
		});
	},
	about: async function (req, res) {
		let user_educations = await uesrEducationModel.find();
		let profile_info = await uesrProfileInfosModel.find();
		let banner = await bannerModel.find();

		controllers.server.locals.seo_title = 'about';

		// console.log('profile_info', profile_info)
		// console.log(controllers.server);

		return res.render(`frontend/about`, {
			profile_info,
			user_educations,
			banner,
		});
	},
	photo_gallery: async function (req, res) {

		let photo_gallery_category = await photoGalleryCategoriyModel.find();
		let tags = await tagsModel.find();
		let blog_category = await blogCategoriesModel.find();

		return res.render(`frontend/gallery/photo_gallery`, {
			photo_gallery_category,
			tags,
			blog_category,
		});
	},
	video_gallery: async function (req, res) {

		let video_gallery_category = await videoGalleryCategoriyModel.find();
		let tags = await tagsModel.find();
		let blog_category = await blogCategoriesModel.find();
		let video_gallery_video = await videoGalleryVideoModel.find();

		return res.render(`frontend/gallery/video_gallery`, {
			video_gallery_category,
			tags,
			blog_category,
			video_gallery_video,
		});
	},
	home_page: async function (req, res) {
		let profile_info = await uesrProfileInfosModel.find();
		let photo_gallery_category = await photoGalleryCategoriyModel.find();
		let video_gallery_category = await videoGalleryCategoriyModel.find();
		let video_gallery_video = await videoGalleryVideoModel.find();
		let blog_category = await blogCategoriesModel.find();
		let settingTitle = await settingModel.findOne({ title: "banner_at_a_glance_title" });
		let settingValue = await settingModel.findOne({ title: "banner_at_a_glance_value" });
		let banner = await bannerModel.find();

		let contemp = await blogCategoriesModel.findOne({ title: "সমসাময়িক" });

		let contems = await blogsModel.find().where({ categories: contemp._id });

		let social_work = await blogCategoriesModel.findOne({ title: "সামাজিক কাজ" });

		let social_works = await blogsModel.find().where({ categories: social_work._id });

		let book_review = await blogCategoriesModel.findOne({ title: "বই পর্যালোচনা" });

		let book_reviews = await blogsModel.find().where({ categories: book_review._id });

		let blog_islam = await blogCategoriesModel.findOne({ title: "ইসলাম" });

		let blog_islams = await blogsModel.find().where({ categories: blog_islam._id });

		let blog_islamic_movement = await blogCategoriesModel.findOne({ title: "ইসলামী আন্দোলন" });

		let blog_islamic_movements = await blogsModel.find().where({ categories: blog_islamic_movement._id });

		let blog_bangladesh = await blogCategoriesModel.findOne({ title: "বাংলাদেশ" });

		let blog_bangladeshs = await blogsModel.find().where({ categories: blog_bangladesh._id });

		let blog_politics = await blogCategoriesModel.findOne({ title: "বাংলাদেশ" });

		let blog_politicss = await blogsModel.find().where({ categories: blog_politics._id });

		let blog_history = await blogCategoriesModel.findOne({ title: "ইতিহাস" });

		let blog_historys = await blogsModel.find().where({ categories: blog_history._id });



		// console.log("photo_gallery",photo_gallery_category);
		return res.render(`frontend/home`, {
			profile_info,
			photo_gallery_category,
			video_gallery_category,
			video_gallery_video,
			blog_category,
			banner,
			settingTitle,
			settingValue,
			contemp,
			contems,
			social_work,
			social_works,
			book_review,
			book_reviews,
			blog_islam,
			blog_islams,
			blog_islamic_movement,
			blog_islamic_movements,
			blog_bangladesh,
			blog_bangladeshs,
			blog_politics,
			blog_politicss,
			blog_history,
			blog_historys,

		});
	},

	blog_posts: async function (req, res) {
		// const model_data = await model.findOne({ _id: data.id });
		let blog = await blogCategoriesModel.findOne({ url: "/"+req.params.url });
		// let datas = await blogCategoriesModel.findOne({ url: "/"+req.params.url });

		let blogs = await blogsModel.find().where({ categories: blog._id });

		controllers.server.locals.seo_title = blog.seo_title;
		controllers.server.locals.seo_description = blog.seo_description;
		controllers.server.locals.seo_image = blog.photo;
		controllers.server.locals.seo_keyword = blog.seo_keyword;
		console.log("blog posts", blog);
		return res.render(`frontend/blog/blog_posts`, {
			blog,
			blogs,
		});
	},

   
	
	
	post_details: async function (req, res) {

		// let comment_blog = await blogCommentModel.find().where({_id:})


		let post_details = await blogsModel.findOne({ _id: req.params.id }).populate('categories');
		let post_comments = await blogsModel.findOne({ _id: req.params.id }).populate('comments');
		// console.log('post comment', post_comments?.comments?.length);
		post_details.total_view = (post_details?.total_view || 0) + 1;
		post_details.save();
		let post = await blogCategoriesModel.findOne({ title: post_details.categories[0]?.title });
		let posts = await blogsModel.find().where({ categories: post._id });

		// let posts = await post_details.populate('categories');

		// let blog = await blogCategoriesModel.findOne({ url: "/"+req.params.url });
		// let blogs = await blogsModel.find().where({ categories: blog._id });

		console.log("postdd", post_details.categories[0]?.title);
		// let blogs = await blogsModel.find().where({ categories: blog._id });

		controllers.server.locals.seo_title = post_details.seo_title;
		controllers.server.locals.seo_schematags = post_details.
			seo_schema_tags;
		controllers.server.locals.seo_description = post_details.seo_description;
		controllers.server.locals.seo_image = post_details.photo;
		controllers.server.locals.seo_keyword = post_details.seo_keyword;
		return res.render(`frontend/post_details`,{
			post_details,
			posts,
			post_comments,
			post,
		})

		// return res.json({
		// 	post_details,
			// posts,
		// });
	},

	save_comment: async function(req, res) {
		let data = req.body;
		const new_comment = await blogCommentModel.create(data);
		let blog = await blogsModel.findOne().where({ _id: new_comment.post_id });
	
		blog.comments.push(new_comment._id);
		blog.save(); 
		console.log('save commmetnt', new_comment);
		// console.log('find comment blog', blog);
	},
	save_contact_message: async function(req, res) {
		let data = req.body;
		const new_contact_message = await contactModel.create(data);
		// console.log('find comment blog', blog);
	},

	/* contemporary: async function (req, res) {

		// const model_data = await model.findOne({ _id: data.id });
		let contemp = await blogCategoriesModel.findOne({ title: "সমসাময়িক" });

		let contems = await blogsModel.find().where({ categories: contemp._id });

		controllers.server.locals.seo_title = contemp.seo_title;
		controllers.server.locals.seo_description = contemp.seo_description;
		controllers.server.locals.seo_image = contemp.photo;
		controllers.server.locals.seo_keyword = contemp.seo_keyword;

		// console.log("contemp",contemp._id);
		// console.log("contems",contems);
		return res.render(`frontend/contemporary`, {
			contems,
			contemp,
		});
	}, */

	/* contemporary_details: async function (req, res) {
		// console.log(req.params.id);
		let contemp_details = await blogsModel.findOne({ _id: req.params.id });
		contemp_details.total_view = (contemp_details.total_view || 0) + 1;
		contemp_details.save();
		let contemp = await blogCategoriesModel.findOne({ title: "সমসাময়িক" });
		let contems = await blogsModel.find().where({ categories: contemp._id });
		// console.log(contemp_details);

		controllers.server.locals.seo_title = contemp_details.seo_title;
		controllers.server.locals.seo_schematags = contemp_details.
			seo_schema_tags;
		controllers.server.locals.seo_description = contemp_details.seo_description;
		controllers.server.locals.seo_image = contemp_details.photo;
		controllers.server.locals.seo_keyword = contemp_details.seo_keyword;

		return res.render(`frontend/post_details`, {
			contemp_details,
			contems,
		});
	}, */
	
	

	contact: async function (req, res) {
		let contact_numbers = await userContactNumbersModel.find();
		let emails = await userEmailsModel.find();
		let social_links = await userSocialLinksModel.find();
		let contact_message = await userContactMessagesModel.find();
		let address = await userSettingTitlesModel.find();
		// console.log("address", address[4].value[1]);
		return res.render(`frontend/contact`, {
			contact_numbers,
			emails,
			social_links,
			contact_message,
			address,
		});
	},
	
	category_post: async function (req, res) {
		let { category_name, category_id } = req.params;

		let categories = await categoryModel.find();
		let blogs = await blogModel.where({ category: [category_id] }).find().populate('creator').populate('category');

		return res.render(`category_post`, {
			categories,
			blogs
		});
	},
};

module.exports = controllers;
