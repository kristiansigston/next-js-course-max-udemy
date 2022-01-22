import dbUtils from "../../../helpers/db-util";
const commentHandler = async (req, res) => {
  console.log("in the money");
  const eventId = req.query.eventId;

  let client;
  try {
    client = await dbUtils.connectDatabase();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email.includes("@") || name.trim() === "" || text.trim() === "") {
      res.status(422).json({ message: "Invalid input" });
      client.close();
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await dbUtils.insertDocument(
        client,
        "comments",
        newComment
      );
      newComment._id = result.insertedId;
      console.log(result);
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (e) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await dbUtils.getAllDocuments(client, "comments", -1);
      res.status(200).json({ comments: documents });
    } catch (e) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }

  client.close();
};

export default commentHandler;
