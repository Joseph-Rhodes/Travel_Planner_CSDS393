const { pool } = require("./dbConfig");


const displayPost = async (body) => {
    const { uid } = body;
    try {
      const results = await pool.query('SELECT * FROM media WHERE uid = $1', [uid]);
      const posts = results.rows.map((post) => ({
        ...post,
        image1: post.image1 ? post.image1.toString('base64') : null,
        image2: post.image2 ? post.image2.toString('base64') : null,
      }));
      return posts;
    } catch (error) {
      throw error;
    }
  };

const storePost = async (body) => {
    const { destination, stay, activity, memory, eat, image1, image2, trip_description, uid } = body;

    // Convert base64 strings to buffers
    const imageBuffer1 = Buffer.from(image1, 'base64');
    const imageBuffer2 = Buffer.from(image2, 'base64');

    return new Promise(function (resolve, reject) {
        pool.query(
            "INSERT INTO media (destination, stay, activity, memory, eat, image1, image2, trip_description, uid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [destination, stay, activity, memory, eat, imageBuffer1, imageBuffer2, trip_description, uid],
            (error, results) => {
                if (error) {
                    reject(error);
                }

                // if row returned, post created
                if (results) {
                    resolve(results.rows);
                } else {
                    reject(new Error("Could not save post."));
                }
            }
        );
    });
};



module.exports = { storePost, displayPost };