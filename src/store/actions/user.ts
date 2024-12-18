import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "src/api/UserService";

const userService = new UserService();

interface IPayload {
  data: any;
  cb?: (response: IResponse<any>) => void;
}

export const setUser = createAsyncThunk(
  "user/setUser",
  async (payload: IPayload) => {
    const { data, cb } = payload;

    try {
      const response = await userService.post(data);

      if (cb) {
        cb(response);
      }
      return response.data;
    } catch (err: unknown) {
      const { error } = err as IResponse<any>;
      if (cb) {
        cb(err as IResponse<any>);
      }
      throw error;
    }
  }
);
