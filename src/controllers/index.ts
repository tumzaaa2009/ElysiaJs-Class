import connection from "@/db";
export const queryTitiel = async () => {
  try {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM test`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  } catch (error) {
    return error;
  }
};

export const PostTitle = async (body) => {
  try {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO test (title) VALUES(?)`,
        body.title,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            console.log("affectedRows".res);
            resolve("affectedRows"+res.affectedRows);
          }
        }
      );
    });
  } catch (error) {}
  return error;
};

// ใช้ then ในการรอผลลัพธ์จาก queryTitiel
queryTitiel()
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error;
  });

PostTitle()
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error;
  });
