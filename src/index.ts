import { app } from "@azure/functions";
import dotenv from "dotenv";
import medallionApi from "@api/medallion-api";
dotenv.config();
medallionApi.auth(process.env.API_KEY);
app.setup({
  enableHttpStream: true,
});
