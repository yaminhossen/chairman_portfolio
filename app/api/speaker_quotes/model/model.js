// last_id:752 

const { default: mongoose, Schema } = require("mongoose");
const { readFirstLine } = require("../../../utilites/readFirstLine");
const writeFirstLine = require("../../../utilites/writeFirstLine");


let speakerQuoresSchema = mongoose.Schema({
	
	title: {
		type: String,
		require: true,
	},
	description: {
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

speakerQuoresSchema.pre('save', async function (next) {
	if (!this.isNew) return;

	try {
		let line = await readFirstLine(__filename);
		let last_id = parseInt(line.substr(11)) + 1;
		await writeFirstLine(__filename, line, `// last_id:${last_id} `);
		this.last_id = last_id;
	} catch (error) {
		console.log(error);
	}

	next();
})



module.exports = mongoose.model("speaker_quotes", speakerQuoresSchema);
