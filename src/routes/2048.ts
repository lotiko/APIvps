import Mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import log from "../logger";
import Records, { IRecords, IRecord } from "../db/models/records";
const router = express.Router();

router
  .get("/records", async (req: Request, res: Response, next: NextFunction) => {
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
      next();
    } catch (error) {
      log.error("API 2048 records =>");
      log.info(error);
      await Mongoose.connection.close();
      return;
    }
  })
  .post("/", async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { size, name, score }: { size: string; name: string; score: number } = req.body;
    try {
      const doc: IRecords = await Records.findOne({ size });
      // const dataDb: IRecords = doc._doc;
      const {
        record1,
        record2,
        record3,
      }: { record1: IRecord; record2: IRecord; record3: IRecord } = doc;
      const tabScores: number[] = [record1.score, record2.score, record3.score];
      let idxIsEgal = -1;
      if (
        tabScores.some((record, idx) => {
          if (record === score) {
            idxIsEgal = idx;
            return true;
          }
          return false;
        })
      ) {
        const key = `record${idxIsEgal + 1}`;
        const recordToUpdate = doc[key] as IRecord;
        recordToUpdate.name.push(name);
        const ret = await Records.updateOne(
          { _id: doc.id },
          { [key]: recordToUpdate },
          { new: true }
        );
        res.json(ret);
      } else {
        const tabRecords: IRecord[] = [record1, record2, {name:[name], score}].sort((a,b) => b.score -a.score);
        const ret = await Records.updateOne(
          { _id: doc.id },
          { record1: tabRecords[0], record2: tabRecords[1], record3: tabRecords[2] },
          { new: true }
        );
        res.json(ret);
      }
      next();
    } catch (error) {
      log.error(error);
      const ret: object = { result: false };
      res.status(400).json(ret);
    }
  });
//   const db = client.db(dbName);
//   db.collection("records")
//     .find({})recor
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
