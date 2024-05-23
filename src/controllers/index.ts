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
            resolve("affectedRows" + res.affectedRows);
          }
        }
      );
    });
  } catch (error) {}
  return error;
};

export const JsonPlacHolder = async () => {
  try {
    const resData = await fetch(
      "https://jsonplaceholder.typicode.com/photos"
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

    return resData;
  } catch (error) {}
};

export const createUser = (body) => {
  try {
    return new Promise((resolve, reject) => {
      let userData = body;
      const query = `INSERT INTO user (email, password) VALUES (?, ?)`;
      const values = [body.email, body.password];
      connection.query(query, values, (err, res) => {
        if (err) {
          reject(err); // เปลี่ยนจาก resolve เป็น reject สำหรับข้อผิดพลาด
        } else {
          resolve("affectedRows: " + res.affectedRows); // แก้ไขข้อความผลลัพธ์ให้ถูกต้อง
        }
      });
    });
  } catch (error) {
    return error;
  }
};

export const checkLogin = async (body) => {
  try {
    const values = body;
    const resposeEmail = await new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE email = ?`;

      connection.query(query, values.email, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res); // ส่งผลลัพธ์ทั้งหมดกลับไป
        }
      });
    });
    // * is verifly
    const isMatch = await Bun.password.verify(
      values.password,
      resposeEmail[0].password
    );
    if (!isMatch) {
      return {
        loggedIn: false,
      };
    } else {
      return {
        loggedIn: true,
      };
    }
  } catch (error) {
    console.error("Error:", error); // เพิ่มการพิมพ์ข้อผิดพลาด
    throw error; // โยนข้อผิดพลาดออกไปเพื่อให้ฟังก์ชันที่เรียกใช้งานสามารถจัดการได้
  }
};

// ใช้ then ในการรอผลลัพธ์จาก queryTitiel
// queryTitiel()
//   .then((result) => {
//     return result;
//   })
//   .catch((error) => {
//     return error;
//   });

// PostTitle()
//   .then((result) => {
//     return result;
//   })
//   .catch((error) => {
//     return error;
//   });
