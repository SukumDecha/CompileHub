"use server";

import { PistonRequestType } from "@/types/type";
import axios from "axios";

const endpoint = "https://emkc.org/api/v2/piston/execute";

export async function compileCode(requestData: PistonRequestType) {
  try {
    const response = await axios.post(endpoint, requestData);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
