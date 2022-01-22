import dbUtils from "../../helpers/db-util";

const signupHandler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const email = req.body.email;
    console.log(email);

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;
    try {
      client = await dbUtils.connectDatabase();
    } catch (e) {
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    try {
      await dbUtils.insertDocument(client, "newsletter", { email });
    } catch (e) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ success: "Signed up" });
  } else {
    res.status(404).json({ success: false, message: "Verb not found" });
  }
};

export default signupHandler;
