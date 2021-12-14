import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import {
  FRIEDO_ABI,
  FRIEDO_ADDRESS,
} from "../../utils/contracts/FriedoContract";
import { getSupply } from "../../utils/functions/FriedoFunctions";

import { finalmeta } from "../../utils/traitsfinal";
const ethers = require("ethers");

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const freidoApi = async (req: any, res: any) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ftm.tools/"
  );
  const providerTest = new ethers.providers.JsonRpcProvider(
    "https://rpc.testnet.fantom.network/"
  );
  const freidoContract = new ethers.Contract(
    FRIEDO_ADDRESS,
    FRIEDO_ABI,
    provider
  );
  const supply = await getSupply(freidoContract);
  await cors(req, res);
  const query = req.query.id;

  if (query < supply) {
    const meta = finalmeta[query];
    res.statusCode = 200;
    res.send(meta);
  } else if (query < 3333) {
    const data = {
      name: "Freido #" + query,
      metadata: "Yet to be minted",
      image: "",
    };
    res.status(200).send(data);
  } else {
    res.status(200).send("Not found");
  }
};

export default freidoApi;
