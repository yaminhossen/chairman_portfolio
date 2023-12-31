// last_id:400 

const { default: mongoose, Schema } = require("mongoose");
const { readFirstLine } = require("../../../../utilites/readFirstLine");
const writeFirstLine = require("../../../../utilites/writeFirstLine");


let ownerIntroSchema = mongoose.Schema({
	
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	
	url: {
		type: String,
		require: true,
	},
	photo: {
		type: String,
		require: true,
	},
	photo_alt: {
		type: String,
		require: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
}, {
	timestamps: true,
});

ownerIntroSchema.pre('save', async function (next) {
	if (!this.isNew) return;

	try {
		// let line = await readFirstLine(__filename);
		// let last_id = parseInt(line.substr(11)) + 1;
		// await writeFirstLine(__filename, line, `// last_id:${last_id} `);
		// this.last_id = last_id;
	} catch (error) {
		console.log(error);
	}

	next();
})



module.exports = mongoose.model("owner_intros", ownerIntroSchema);
