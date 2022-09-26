import sanitizedConfig from "../config";
import User from "../models/User";

async function checkAndCreateFirstAdmin() {
	const adminData = sanitizedConfig.ADMIN;
	const admin = await User.findOne({ email: adminData.email });
	if (!admin) {
		const newAdmin = new User({
			email: adminData.email,
			password: adminData.password,
			firstName: adminData.firstName,
			lastName: adminData.lastName,
			role: 'Admin',
		});

		await newAdmin.save();
		console.log(
			'Created first admin... Check .env for email and password...'
		);
	}
}

export default checkAndCreateFirstAdmin;
