import Mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import log from "../logger";
import Records, { IRecords, IRecord } from "../db/models/records";
const router = express.Router();

router.get("/records", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Records.find({});
    const ret = {};
    for (const record of data) {
      const { record1, record2, record3, size } = record;
      Object.defineProperty(ret, size, {
        value: { record1, record2, record3 },
        enumerable: true,
      });
    }
    res.json(ret);
    await Mongoose.connection.close();
  } catch (error) {
    log.error("API 2048 records =>");
    log.info(error);
    await Mongoose.connection.close();
    return;
  }
  return;
});
//   const db = client.db(dbName);
//   db.collection("records")
//     .find({})
//     .toArray()
//     .then(async (docs) => {
//       if (docs.length === 0) {
//         let r = 2;
//         const baseDocs = [];
//         while (r <= 12) {
//           let c = 2;
//           while (c <= 12) {
//             let doc = {
//               size: `${r}_${c}`,
//               record1: { name: "Whaou", score: 0 },
//               record2: { name: "lo", score: 0 },
//               record3: { name: "Pif", score: 0 },
//             };
//             baseDocs.push(doc);
//             c++;
//           }
//           r++;
//         }
//         client.connect(function (err) {
//           assert.strictEqual(null, err);
//           console.log("Connected successfully to server");
//         });
//         db.collection("records")
//           .insertMany(baseDocs)
//           .then((inserted) => {
//             console.log(
//               `
// ${inserted.insertedCount} records document inserted.
// First is:\n`,
//               inserted.ops[0],
//               "\nLast is: \n",
//               inserted.ops[120]
//             );

//             res.render("2048", { ...baseDataView, docs: inserted.ops });
//             client.close();
//           })
//           .catch((err) => console.log(err));
//       } else {
//         console.log("Found records");
//         res.render("2048", { ...baseDataView, docs: docs });
//         client.close();
//       }
//     })
//     .catch((err) => console.log(err));
// });
// router.get("/scores/:size", (req, res, next) => {
//   const client = new MongoClient(url, { useUnifiedTopology: true });
//   client.connect(function (err) {
//     assert.strictEqual(null, err);
//     console.log("Connected successfully to server");
//   });
//   const db = client.db(dbName);
//   db.collection("records")
//     .findOne({ size: req.params.size })
//     .then(async (docs) => {
//       res.json(docs);
//       client.close();
//     })
//     .catch((err) => console.log(err));
// });
// router.post("/score", (req, res, next) => {
//   const client = new MongoClient(url, { useUnifiedTopology: true });
//   client.connect(function (err) {
//     assert.strictEqual(null, err);
//     console.log("Connected successfully to server");
//   });
//   console.log("in route");
//   const db = client.db(dbName);
//   const query = req.body.query;
//   const update = req.body.update;
//   console.log(req.body);
//   // console.log(query, update, req);
//   db.collection("records")
//     .updateOne(query, { $set: { ...update } })
//     .then(async (result) => {
//       if (result.modifiedCount === 0 && result.upsertedCount === 0) {
//         console.log("No changes made to the collection.");
//       } else {
//         if (result.matchedCount === 1) {
//           console.log("Matched " + result.matchedCount + " documents.");
//         }

//         if (result.modifiedCount === 1) {
//           console.log("Updated one document.");
//         }
//       }
//       res.json(result.result);
//       client.close();
//     })
//     .catch((err) => console.log(err));
// });
export default router;
